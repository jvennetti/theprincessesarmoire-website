# The Princesses Armoire website

This repository is the live site at https://theprincessesarmoire.com.
Every push to the `main` branch publishes the site through Cloudflare Workers Builds, usually within a minute or two.

## Where things are
- `public/index.html` is the whole one-page site.
- `public/assets/css/style.css` holds the styles. Phone rules sit inside `@media (max-width: 760px)` blocks.
- `public/assets/js/` holds the quiz (`quiz.js`), the contact popup (`contact.js`) and small page behaviour (`main.js`).
- `public/assets/img/` holds every photo. Shop photos link to Poshmark listings in `index.html`.
- `src/worker.js` sends the contact form emails. `wrangler.jsonc` holds its settings.
- `docs/DESIGN.md` and `docs/decisions.md` record the design rules. Read them before changing how anything looks.

## Rules
- Never write Melinda's last name or her personal Gmail address in any file. The form reads her inbox address from the Cloudflare secret `TO_EMAIL`.
- After any change to `style.css` or a script, raise the `?v=` number on its link in `index.html` (for example `style.css?v=3` becomes `style.css?v=4`). Phones keep old copies for 7 days otherwise.
- Keep photos sharp. Resize new photos to about 1000 to 1600 pixels wide and save them as JPG before adding them.
- Use the name "The Princesses Armoire" (no apostrophe).
- Check a change at phone width (about 400 pixels) and desktop width before pushing.
- Do not change `wrangler.jsonc`, `src/worker.js` or `public/_headers` unless the change is about the contact form or the hosting.
