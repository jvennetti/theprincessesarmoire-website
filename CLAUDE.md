# The Princesses Armoire website

This folder is the live site at https://theprincessesarmoire.com.
The site is hosted on Cloudflare in Melinda's own account. You (Claude) edit the files here and publish them with Wrangler, Cloudflare's command-line tool.
You are working for Melinda, the owner. She is not a programmer. Explain things in plain words, keep replies short, and do the technical steps yourself.

## First-time setup (do this once, when Melinda pastes the repository link)
1. Pick a home for the site, for example a folder named `theprincessesarmoire` in her Documents folder. Download the repository there with `git clone <link>`. If Git is missing, download the ZIP from the repository page ("Code", then "Download ZIP") and unzip it there instead.
2. Check that Node.js is installed (`node --version`). If it is missing, ask Melinda to install the LTS version from https://nodejs.org, then continue.
3. Run `npx wrangler login`. A Cloudflare page opens in her browser. She signs in to her Cloudflare account (melinda@theprincessesarmoire.com) and clicks **Allow**. Never type her password for her.
4. Run `npx wrangler whoami`. It must list the account ID `45bd8dffb91bcf351d7a0ffb9e647dde`. If it shows a different account, stop and tell Melinda.
5. Run `npx wrangler deploy --dry-run`. It should finish without errors. Do not publish yet; nothing has changed.
6. Tell Melinda setup is done and that she can ask for changes in this folder from now on.

## Making a change
1. Make the edit Melinda asked for.
2. Show her the result before publishing. Open `public/index.html` in a browser, or run `npx wrangler dev` and open the address it prints. Check the page at phone width (about 400 pixels) and desktop width.
3. When she approves, run `npx wrangler deploy` from this folder. The live site updates within a minute.
4. Save a record of the change: `git add -A` then `git commit -m "<what changed>"`. This keeps a history, so any change can be undone later.
5. Open https://theprincessesarmoire.com and confirm the change is live. Phones may need a refresh.

## Where things are
- `public/index.html` is the whole one-page site.
- `public/assets/css/style.css` holds the styles. Phone rules sit inside `@media (max-width: 760px)` blocks.
- `public/assets/js/` holds the quiz (`quiz.js`), the contact popup (`contact.js`) and small page behaviour (`main.js`).
- `public/assets/img/` holds every photo. Shop photos link to Poshmark listings in `index.html`.
- `src/worker.js` sends the contact form emails. `wrangler.jsonc` holds its settings.
- `docs/DESIGN.md` and `docs/decisions.md` record the design rules. Read them before changing how anything looks.

## Rules
- This folder on Melinda's computer is the only copy anyone edits. Do not download the repository again over it; that would erase her changes.
- Never write Melinda's last name or her personal Gmail address in any file. The contact form reads her inbox address from the Cloudflare secret `TO_EMAIL`, which is already set. The spam-check secret `TURNSTILE_SECRET` is also already set. Publishing keeps both.
- After any change to `style.css` or a script, raise the `?v=` number on its link in `index.html` (for example `style.css?v=3` becomes `style.css?v=4`). Phones keep old copies for 7 days otherwise.
- Keep photos sharp. Resize new photos to about 1000 to 1600 pixels wide and save them as JPG before adding them.
- Use the name "The Princesses Armoire" (no apostrophe).
- Do not change `wrangler.jsonc`, `src/worker.js` or `public/_headers` unless the change is about the contact form or the hosting.
- Do not change anything else in her Cloudflare account (domain, DNS, email routing). Email for melinda@theprincessesarmoire.com depends on it.
