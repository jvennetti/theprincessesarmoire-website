/* The Princesses Armoire: serves the site and handles the contact form.
   POST /api/contact  ->  checks the spam trap and Cloudflare Turnstile, then emails the shop.
   Settings live in wrangler.jsonc (FROM_EMAIL, TO_EMAIL) and secrets (TURNSTILE_SECRET). */

import { EmailMessage } from "cloudflare:email";

const MAX_BODY = 20000;

// RFC 2047 encoded-word for any header text that is not plain ASCII.
const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const word = (s) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
const addr = ({ email, name }) => {
  if (!name) return `<${email}>`;
  const n = name.replace(/["\\]/g, "");
  return /^[\x20-\x7e]*$/.test(n) ? `"${n}" <${email}>` : `${word(n)} <${email}>`; // encoded-words must not be quoted
};

function buildMime({ from, to, replyTo, subject, text }) {
  const body = b64(text).replace(/.{76}/g, "$&\r\n");
  const domain = from.email.split("@")[1];
  return [
    `From: ${addr(from)}`,
    `To: ${addr(to)}`,
    `Reply-To: ${addr(replyTo)}`,
    `Subject: ${word(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    body,
  ].join("\r\n");
}

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}
const clean = (v, n) => String(v ?? "").replace(/\r/g, "").trim().slice(0, n);
const oneLine = (v, n) => clean(v, n).replace(/\s+/g, " ");

async function contact(request, env) {
  if (request.method !== "POST") return json(405, { ok: false, error: "method" });
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: "too_large" });
  let d;
  try { d = JSON.parse(raw); } catch { return json(400, { ok: false, error: "bad_json" }); }

  // A person never fills the hidden "company" field. Pretend success so bots learn nothing.
  if (clean(d.company, 200)) return json(200, { ok: true });

  const name = oneLine(d.name, 120), email = oneLine(d.email, 200), message = clean(d.message, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { ok: false, error: "fields" });

  // Cloudflare Turnstile check.
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET || "");
  form.append("response", clean(d.token, 4000));
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) form.append("remoteip", ip);
  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const outcome = await verify.json().catch(() => ({}));
  if (!outcome.success) return json(403, { ok: false, error: "check" });

  const topic = oneLine(d.topic, 80) || "Website message";
  const lines = [
    `Form: ${topic}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${oneLine(d.phone, 40) || "(not given)"}`,
  ];
  if (d.service) lines.push(`Needs: ${oneLine(d.service, 80)}`);
  if (d.link) lines.push(`Link: ${oneLine(d.link, 500)}`);
  if (d.in_us) lines.push(`In the United States: ${oneLine(d.in_us, 10)}`);
  lines.push("", message, "", "Reply to this email to answer them directly.");

  try {
    // Delivered to her inbox (TO_EMAIL), but the visible To: header is the shop address (SHOP_EMAIL),
    // so Gmail's "reply from the same address the message was sent to" answers from melinda@.
    const mime = buildMime({
      from: { email: env.FROM_EMAIL, name: "The Princesses Armoire website" },
      to: { email: env.SHOP_EMAIL || env.TO_EMAIL, name: "Melinda" },
      replyTo: { email, name },
      subject: `${topic}: ${name}`,
      text: lines.join("\n"),
    });
    await env.EMAIL.send(new EmailMessage(env.FROM_EMAIL, env.TO_EMAIL, mime));
  } catch (e) {
    console.log("send failed", e && e.message);
    return json(502, { ok: false, error: "send" });
  }
  return json(200, { ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // One address for the site: www goes to the bare domain.
    if (url.hostname === "www.theprincessesarmoire.com") {
      url.hostname = "theprincessesarmoire.com";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/api/contact") return contact(request, env);
    return env.ASSETS.fetch(request);
  },
};
