/* The Princesses Armoire: contact popup for alterations and buying direct. Classic script (works from file://).
   On the live site the form posts JSON to /api/contact (deploy/src/worker.js), which checks Cloudflare Turnstile
   and emails the shop. Opened from a file or a preview host, it checks the fields and shows a preview note instead. */
(function () {
  "use strict";
  var LIVE = /(^|\.)theprincessesarmoire\.com$|\.workers\.dev$|^localhost$|^127\.0\.0\.1$/.test(location.hostname);
  var FORM_ENDPOINT = LIVE ? "/api/contact" : "";
  var SITE_KEY = (document.querySelector('meta[name="turnstile-sitekey"]') || {}).content || "";
  var checkBox = document.getElementById("contactCheck");
  var widgetId = null;

  // Load Turnstile the first time the popup opens, on the live site only.
  function loadTurnstile() {
    if (!LIVE || !SITE_KEY || !checkBox || widgetId !== null || window.__tsLoading) return;
    window.__tsLoading = true;
    window.onTurnstileLoad = function () {
      widgetId = window.turnstile.render(checkBox, { sitekey: SITE_KEY, appearance: "interaction-only", theme: "light", action: "contact" });
    };
    var s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
    s.async = true; s.defer = true;
    document.head.appendChild(s);
  }
  function turnstileToken() {
    return widgetId !== null && window.turnstile ? window.turnstile.getResponse(widgetId) || "" : "";
  }

  var dlg = document.getElementById("contact");
  if (!dlg) return;
  var form = document.getElementById("contactForm");
  var done = document.getElementById("contactDone");
  var doneText = document.getElementById("contactDoneText");
  var err = document.getElementById("contactError");
  var topic = document.getElementById("contactTopic");
  var msgLabel = document.getElementById("contactMsgLabel");
  var phoneField = document.getElementById("contactPhoneField");
  var mode = "alterations";
  var title = document.getElementById("contact-title");
  var lede = document.getElementById("contactLede");
  var opener = null;

  var MODES = {
    alterations: { title: "Ask about alterations", lede: "Tell me about the piece and what it needs.", topic: "Alterations", label: "Message" },
    direct: { title: "Save 10%", lede: "", topic: "Buy direct (10% off)", label: "What item are you interested in?" }
  };

  function open(which, btn) {
    mode = MODES[which] ? which : "alterations";
    var m = MODES[mode];
    opener = btn || null;
    title.textContent = m.title;
    lede.textContent = m.lede;
    form.reset();
    topic.value = m.topic;
    msgLabel.textContent = m.label;
    // show only the fields for this form; hidden fields are disabled so they are not checked or sent
    form.querySelectorAll("[data-only]").forEach(function (el) {
      var on = el.getAttribute("data-only") === mode;
      el.hidden = !on;
      el.querySelectorAll("input, select, textarea").forEach(function (f) { f.disabled = !on; });
    });
    phoneField.classList.toggle("field--wide", mode === "direct");
    clearErrors();
    form.hidden = false;
    done.hidden = true;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    loadTurnstile();
    if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId);
    var first = form.querySelector("input[name=name]");
    if (first) first.focus();
  }

  function close() {
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }
  dlg.addEventListener("close", function () { if (opener) opener.focus(); });

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-contact]");
    if (b) { e.preventDefault(); open(b.getAttribute("data-contact"), b); return; }
    if (e.target.closest("[data-close]")) { close(); return; }
    if (e.target === dlg) close(); // click on the backdrop
  });

  function clearErrors() {
    err.hidden = true; err.textContent = "";
    form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
  }

  function check() {
    var bad = [];
    var name = form.elements.name, email = form.elements.email, msg = form.elements.message, link = form.elements.link;
    if (!name.value.trim()) bad.push([name, "your name"]);
    if (!email.value.trim() || !email.checkValidity()) bad.push([email, "an email address I can reply to"]);
    if (mode === "alterations" && link.value.trim() && !link.checkValidity()) bad.push([link, "a full link that starts with https://"]);
    if (mode === "direct" && !form.querySelector("input[name=us]:checked")) bad.push([form.querySelector("input[name=us]"), "whether you are in the United States"]);
    if (!msg.value.trim()) bad.push([msg, "a few words about the piece"]);
    return bad;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    var bad = check();
    if (bad.length) {
      bad.forEach(function (b) { (b[0].type === "radio" ? b[0].closest("fieldset") : b[0]).setAttribute("aria-invalid", "true"); });
      var words = bad.map(function (b) { return b[1]; });
      var last = words.pop();
      err.textContent = "Please add " + (words.length ? words.join(", ") + " and " : "") + last + ".";
      err.hidden = false;
      bad[0][0].focus();
      return;
    }
    var data = {};
    ["name", "email", "phone", "topic", "message"].forEach(function (k) { data[k] = form.elements[k].value.trim(); });
    if (mode === "alterations") { data.service = form.elements.service.value; data.link = form.elements.link.value.trim(); }
    if (mode === "direct") { var us = form.querySelector("input[name=us]:checked"); data.in_us = us ? us.value : ""; }
    data.company = form.elements.company.value;
    data.token = turnstileToken();
    var first = data.name.split(" ")[0];

    if (!FORM_ENDPOINT) {
      doneText.textContent = "Thanks, " + first + ". This form is a preview and is not connected yet. It will send messages once the shop email is set up.";
      showDone();
      return;
    }
    var send = form.querySelector(".contact__send");
    send.disabled = true; send.textContent = "Sending";
    fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) {
        if (r.status === 403) throw new Error("check");
        if (!r.ok) throw new Error(r.status);
      })
      .then(function () { doneText.textContent = "Thanks, " + first + ". Your message is on its way. I reply by email."; showDone(); })
      .catch(function (e) {
        if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId);
        err.textContent = e && e.message === "check"
          ? "Please finish the quick check above the Send button, then send again."
          : "The message did not send. Please try again, or message @theprincessesarmoire on Instagram.";
        err.hidden = false;
      })
      .then(function () { send.disabled = false; send.textContent = "Send"; });
  });

  function showDone() { form.hidden = true; done.hidden = false; done.focus(); }
})();
