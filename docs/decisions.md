# Decisions: Princess' Armoire site

Durable record. Handoffs are single-use; decisions live here.

## From the first build (v1, 2026-11-13)
- **Checkout stays on Poshmark.** Poshmark bans off-platform sales, and Posh Protect only covers on-platform orders. No cart or payment on the site.
- **Layout = "the open armoire" scrapbook.** Every category gets its own layout, in nav order (Dresses, Tops, Bottoms, Shoes, Accessories). This comes from Josh's notes on LoveShackFancy, DÔEN, Alessandra Rich and Stitch Fix. Monique Lhuillier (15/15) set the big-photo-beside-text pattern.
- **Light bands only, no dark sections.** Josh dislikes dark colors (For Love & Lemons note).
- **Fonts: Cormorant Garamond + Jost (+ Caveat for the one quiz note).** They match her serif logo. This overrides Josh's usual Poppins default.
- **Crown art = inline SVG** (`#crown-shape` symbol in index.html), redrawn from her logo crown.
- **Signature feature = calm 3-question quiz near the bottom** (from Josh's ThirdLove note). Product data and tags live in `assets/js/quiz.js`, array `P`.
- **Logos: 7.** No real Gunne Sax logo file exists. Real logos only.
- **No she/her in copy.** The owner's pronouns are unknown.
- **Promo bar kept** ("15% off 4+ pieces · Offers welcome"). Josh liked Hill House's promo bar.
- **"Bottoms" links to the Skirts category.** Poshmark has no Bottoms category.

## From Josh's v1 review (v2, 2026-11-14)
- **Versions are frozen folders.** `v1/`, `v2/`, and so on, each with its own `assets/`. Edit only the newest folder. The top-level `index.html` is a picker. See `VERSIONS.md`.
- **Name: "Princess' Armoire".** Logo and title drop "The". The spelling follows BRIEF.md. Her Instagram and Etsy handles use "Princesses". Not confirmed with the client.
- **Portfolio over funnel.** Section CTAs are underlined text links, and there are no "from $X" price chips. Filled buttons appear only in the header, the hero and the close. Josh said v1 took too much from the sales-funnel references.
- **Photo bar: crystal clear or cut.** Every photo is sharpness-scored and checked at full size. Josh rejected the blurry rose gold skirt.
- **Section titles are plain and searchable** ("Sequin, tulle and velvet skirts"). Josh rejected "Sequin skirts, sewn in the closet". He liked "Jewel heels and lace-up boots" and "Edwardian lace and 1950s tulle".
- **The roses band carries a line about feeling lovely.** Josh rejected "One of each. When it sells, it's gone."
- **Hero line: "Lovely vintage and designer clothing".** Josh rejected "Looking for a dress no one else will wear?" because it reads as "ugly dress".
- **Stats say "rating", not "stars".** "4.9 rating on Depop" with star icons. "Selling since" sits above 2018. Each badge has its own shape.
- **Brand logos:** no section title, no boxes, black on the cream band, not clickable. The brand links did not go to her items for that brand.
- **The FAQ is one simple column.** Josh found the 2x2 grid hard to read.
- **Photos between the FAQ and the close.** Josh asked for them.

## From Josh's v2 review (v3, 2026-11-18)
- **Name: "The Princesses Armoire"** (no apostrophe). This replaces "Princess' Armoire". Josh confirmed it.
- **Crown = the official logo crown, traced.** Source: `img-source/closet-logo-the-armoire.jpg` traced with OpenCV into `v3/assets/img/crown-official.svg`. The full official logo ("THE PRINCESSES / ARMOIRE" + crown) is traced from a Poshmark listing cover into `logo-official.svg`. Do not redraw the crown by hand again.
- **No watermarked photos in the hero.** Josh rejected the Edwardian shot because of its watermark.
- **Slogan "You are uniquely designed, one of a kind."** lives on the big image band, over the client's quote-card photo. The hero headline must not repeat it.
- **Stats sit in one light line right under the hero** (v6, 2026-11-18). This replaces "stats near the bottom". Show the Depop rating as five stars; never print "5.0".
- **Skirts use the v1 mosaic.** Josh liked v1's layout with two skirts at the bottom right. He rejected both earlier lead photos (rose gold on a dress form, blush on a dress form).
- **Stock photos are allowed when the client picks them,** but only on the free Unsplash license. Unsplash+ photos need a paid license first. Credit the photographer in the footer.
- **Buy direct for 10% off** replaces the Q&A. Contact goes through one popup form (alterations or buy direct). Instagram DM stays as the second route in the closing section.
- **Risk to raise with the client:** Poshmark's terms bar using Poshmark to arrange sales off the platform. The site itself is separate, but direct buyers lose Posh Protect, and a piece sold directly must come down from Poshmark at once to avoid selling it twice.

## From Josh's v5 review (v6, 2026-11-18)
- **Crown section is warm linen** (#ECE3D5, v7). Blush clashed with the silhouette photo, and near-black was too dark for the site.
- **Beach photo is never framed.** The close centers the words and buttons (never left-aligned) with the walker in the right third, faded into the cream (v7). Keep the section short; the full-width v6 version was too big.
- **Quiz picks come from the chosen category only,** tagged by maker and era. Use the seller's own sharp photos; skip soft or collage covers.

## From Josh's v7 review (v8 and v9, 2026-11-20)
- **Brand logos search the closet** (`https://poshmark.com/closet/the_armoire?query=<brand>`), so results stay current. This replaces "one listing per brand". Vintage searches "vintage".
- **The 10% section leads with the reason** ("Want to save 10%?") and shows Melinda, the owner. Her name is Melinda; use it in captions only where Josh gives it.
- **The contact popup is for the discount**: no topic menu, no link field.
- **Header wordmark has no ink crown.** The gold crowns carry it. The footer logo keeps the ink crown.
- **Josh asked to see both closes:** the shop banner (v8) and left-aligned words with the beach photo (v9). The earlier "never left-aligned" rule is replaced in v9.
- **Header: centered menu, "Get 10% off" button.** Josh tried the menu at the right and went back to centered. The header button is "Get 10% off" in --rose-dark and jumps to #direct; the menu has no 10% link. ARMOIRE is centered under the name.
- **v9 close: Josh likes the faded beach photo.** He wants it large and the layout centered on the page: words left, photo right. The arch-framed version was tried and replaced.
- **"Don't make a new version" means edit in place.** Josh said it for the 10% copy change on 2026-11-20; v8 and v9 were edited in place.
- **Closing section rules (Josh, round 4):** words and buttons centered in the exact middle, never framed, no white glow behind the letters. Keep the section height the same as the v9 close (854 / 733 / 566 / 865px). Photos may fade into the cream. Josh likes dreamy, warm light; darker ocean photos were rejected.
- **Contact popup per form:** Save 10% asks "Are you in the United States?" (Yes / No) and has no lede. Alterations has a service menu (no 10% option) and an optional link.
- **Seamstress location is shown as Orlando, Florida** (Josh's wording). The footer still says Oviedo, Florida.

## Launch (2026-11-20)
- **v11 is the site.** Domain theprincessesarmoire.com (Namecheap, registered 2026-11-19).
- **Hosting: a Cloudflare Worker with static assets in Melinda's own Cloudflare account**, signed up with melinda@theprincessesarmoire.com. Josh is invited as Administrator so wrangler can deploy. The zone and Email Routing live in her account.
- **Form email: Workers `send_email` binding** to her verified Email Routing destination (free on any plan), sent from website@theprincessesarmoire.com with the customer as Reply-To.
- **Sending as melinda@ from Gmail: Brevo free SMTP** (decided 2026-11-20). Josh chose it over Cloudflare Workers Paid to keep the cost at zero. Brevo free plan: 300 sends a day, no time limit. Gmail "Send mail as" uses smtp-relay.brevo.com, port 587 TLS, her Brevo login and an SMTP key. Brevo's domain-authentication records (DKIM, DMARC, code) go into her Cloudflare DNS after the nameservers move. Namecheap's free forwarding is receive-only; its Private Email mailbox is paid.
- **Brevo account: Melinda's own, signed up with her Gmail** (Josh, 2026-11-20). Not Josh's existing Brevo account.
- **Form alerts: Gmail app notifications, free** (Josh, 2026-11-20). AT&T ended email-to-text on 2025-06-17; paid SMS (Twilio) declined. A Gmail filter on from:website@theprincessesarmoire.com labels the messages and marks them important.
- **Gmail default sender is melinda@** (2026-11-20). Her Gmail's default "Send mail as" is melinda@theprincessesarmoire.com, "Always reply from default address", "Show this address only". Every new email and reply, on computer or phone, goes out as melinda@ unless she changes the From line. Form emails show To: melinda@ (Worker SHOP_EMAIL) and come from website@ so Reply goes to the customer.
- **Her Gmail address stays out of every file** (2026-11-20). It contains her last name. The Worker reads it from the `TO_EMAIL` secret (`npx wrangler secret put TO_EMAIL`). Docs and prompts files use `[HER GMAIL]`. Customers only ever see melinda@ or website@.
- **Browser work goes through Claude in Chrome** (2026-11-20). Josh does not import cookies into the built-in pane. The Claude in Chrome connector is on in the desktop app; a Code-tab session started after it was switched on drives Chrome directly.
- **Live setup (2026-11-20):** Melinda's Cloudflare account `45bd8dffb91bcf351d7a0ffb9e647dde` (Josh is Administrator). Zone `6e8c989ff813365299369e5bbb4ae05a`, Free plan, nameservers major/nancy.ns.cloudflare.com, added with no imported records. Email Routing on; rule melinda@ -> her Gmail. Worker `theprincessesarmoire` on custom domains apex + www (www 301s to apex). Turnstile widget "The Princesses Armoire contact form" (managed, site key `0x4AAAAAAGKyWtAoyPGFdYn7`). Secrets: `TURNSTILE_SECRET`, `TO_EMAIL`.
- **Wrangler on Josh's PC is logged in as melinda@theprincessesarmoire.com** (the login page opened in Chrome, which was signed in as her). It sees only her account. For Josh's own Cloudflare projects, run `npx wrangler login` again from a browser signed in as Josh.
- **Phone layout rules (Josh, 2026-11-20, phones only, edited live in v11):** stats show only Poshmark followers and "Selling since 2018" (pieces for sale changes; stars removed). Each shelf reads title, then photos, then the shop link centered underneath (dresses: big dress then three; shoes: big pair then two). Accessories title is larger, on two lines, with the button at the bottom of the section. Alterations and Save now buttons centered. Seamstress photo caption hidden. Quiz shows "Question 1 of 3" with one filling line (short bars looked like swipe dots). Skirt gallery: aqua and gold on top, silver left and violet right. Hero button stays left-aligned with the hero text.
- **Asset links carry a version tag** (`style.css?v=2`, `quiz.js?v=2`). Assets cache for 7 days, so bump the number on every CSS or JS change.
- **Gmail signature:** handwritten "Melinda / The_Armoire" under a small gold crown, image `assets/img/email-signature.png?v=1` shown at 113x86, default for melinda@ on new emails and replies.
- **Spam: hidden trap field + Cloudflare Turnstile** (interaction-only). No star-rating schema (self-published ratings are not eligible).

