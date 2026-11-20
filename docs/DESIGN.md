# Design brief: The Princess' Armoire

Brand mode, one-page landing site. Opens from `index.html` by double-click.

## Governing idea: "The open armoire"
A scrapbook of the closet. Each category is a shelf with its own layout, in nav order. Sizes vary from section to section (big photo beside text, a row of small arches, a mosaic, one full-width image band). Light, muted bands only. The page is calm, the photos carry it.

## Tokens
| Token | Hex | Use |
|---|---|---|
| --cream | #FBF6F1 | Page background |
| --blush | #F4E1DC | Alternate bands, promo bar, quiz band |
| --petal | #E8C4BE | Decoration, arch outlines |
| --mint | #E3EEE8 | Soft accent band and stat shapes (from her mint branding tile) |
| --rose | #9A4A5A | Buttons, links, accent words (5.59:1 on cream) |
| --ink | #2A2226 | Text (14.43:1 on cream) |
| --mocha | #6B5A5C | Secondary text (6.03:1 on cream) |
| --gold | #B38A55 / --gold-2 #D9BF8C / --gold-3 #8A6634 | Crown art, hairlines, ornaments only (no text) |

Fonts: **Cormorant Garamond** 500/600 + 500 italic (display, 22px and up; matches her logo and italic branding), **Jost** 300/400/500 (body, nav, buttons; matches her light sans lists), **Caveat** 700 for the one hand-drawn note. Owner default is Poppins; her brand's serif wordmark wins here.

Type scale (clamp, 375 to 1440):
- Hero H1: clamp(2.5rem, 1.8rem + 3vw, 4.5rem), lh 1.05
- H2: clamp(2rem, 1.6rem + 1.9vw, 3.25rem), lh 1.1
- H3 / product names: clamp(1.2rem, 1.12rem + .3vw, 1.4rem)
- Body: clamp(1rem, .98rem + .1vw, 1.0625rem), lh 1.65, Jost 300/400
- Caps labels and buttons: .8125rem, 500, letter-spacing .14em

Spacing: 4, 8, 16, 24, 32, 48, 64, 96, 128. Section padding clamp(64px, ..., 112px). Tile gap 16 (8 mobile). Container 1280px, gutter clamp(20px, 3vw, 48px). Paragraphs max 46ch beside photos.

Radius: photos in arch frames (border-radius: 999px 999px 0 0) or square (0). Buttons 2px. No shadows except the sticky header hairline.

Buttons: primary 48px, rose fill, cream text, Jost 13px caps .14em, hover ink. Secondary: underlined text link.

Images: product photos at most ~520 CSS px wide (sources 800-1060px). Paintings and textures (1920px+) are the only full-width images. No catalog shots with brand text, no third-party watermarks.

## Section outline (nav order = page order)
1. **Promo bar** (blush): 15% off 4+ pieces · Offers welcome.
2. **Header** (sticky): crown + stacked "THE ARMOIRE" wordmark; nav Dresses, Tops, Bottoms, Shoes, Accessories; "Shop the closet" button.
3. **Hero** (cream): left: crown art piece, H1 yes-question, lede, CTA, proof line. Right: scrapbook collage of three of her photos (one tall arch, two smaller offset). First screen sells.
4. **Proof strip** (cream, small): four numbers with soft colored shapes: 139,515 followers, 386 pieces for sale, 4.9 stars on Depop, since 2018.
5. **Dresses** (blush): Monique layout: one big photo left, text block right with three smaller dresses under it (name, size, price). CTA Shop dresses.
6. **Tops** (cream): text left narrow, four arch-framed photos in a row on the right, staggered heights.
7. **Statement band**: full-width Fragonard "The Swing" with one sentence on a cream panel: "One of each. When it sells, it's gone."
8. **Bottoms** (mint): mosaic: one tall skirt photo, two squares, text panel. Her handmade sequin skirts lead.
9. **Shoes** (cream): split reversed, photos left in a 2x2 with one large, text right.
10. **Accessories** (blush): crowns lead. Large crown photo, collar necklace and bag small, text.
11. **Brands** (cream): ThredUp circles. 12 brand name circles, alternating blush/mint/cream tints, each links to a listing or the closet.
12. **The seamstress** (mint): her story and services: alterations, mending, custom-made. Instagram link. Boucher "La Toilette" painting beside it.
13. **Quiz** (blush, calm): the signature feature. See spec.
14. **Questions** (cream): four short answers.
15. **Close** (blush): crown art small, final CTA, reassurance.
16. **Footer** (cream): wordmark, shop links (Poshmark, Depop, Etsy, Instagram), image credits.

CTA verb: "Shop" everywhere. Header button and hero: "Shop the closet". Sections: "Shop dresses" etc. Quiz results: "Shop this piece".

## Signature feature: "Find your piece" quiz
- **What it is:** a three-question style quiz in the blush band near the bottom that returns three real pieces from her closet.
- **Parts:** progress line "Question 1 of 3"; question in Cormorant italic; choices; Back link; results.
  - Q1 "What are you shopping for?" Five arch-framed photo choices: Dresses, Tops, Bottoms, Shoes, Accessories (her photos).
  - Q2 "Where are you wearing it?" Four pill choices: A wedding or gala · A garden party or brunch · Everyday · A themed event or fair.
  - Q3 "Which feels most like you?" Three pill choices: Romantic vintage · Sparkle and shine · Clean and classic.
  - Result: "Your three picks" with three product cards (arch photo, name, size, price, "Shop this piece") plus "Shop all dresses" (matching category) and "Start over".
- **Logic:** each product is tagged with category, occasions and styles. Score = category match x3 + occasion x1 + style x1. Show the top three, always at least one from the chosen category; ties broken by list order.
- **Look:** calm. Cream cards on blush, petal outlines, rose when selected. Choices fade in (200ms). No timers, no confetti.
- **Interaction:** click or tap a choice to move on. Keyboard: choices are buttons; focus moves to the next question heading. Back returns one step.
- **Avoid:** dark colors, drawings, pop-ups, auto-advance timers, layout jump (fixed min-height).
- **Size:** max-width 960px centered. Phone: Q1 photos in a 3+2 grid, pills full width.
- **Hand-drawn note:** "Pick one to start!" in Caveat, rose, rotated -10deg, arrow pointing down-left at the first photo choice. Desktop only beside the choices; on phone it sits above them, small.
- **Performance:** plain HTML, CSS and a classic script. Reduced motion: no fades.

## Crown art (hero and close)
- Inline SVG redrawn from her logo crown: five points, three tipped with fleur-de-lis, two with small orbs; a band with a row of pearls and three cabochon jewels (rose, mint, gold); a curved base rim.
- Gold in three tones (gradient #D9BF8C to #B38A55 to #8A6634) with fine engraved lines on the band, a thin ink outline at 15% opacity.
- Static. One slow light sweep across it on page load (1.6s, once), none with reduced motion. Not interactive, so no note.
- Size: 120px wide in the hero above the H1; 72px at the close; 28px in the header (solid ink version, like her logo).
