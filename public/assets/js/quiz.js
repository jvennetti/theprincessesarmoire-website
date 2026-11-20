/* "Find your piece" quiz: three questions, three real pieces from the closet. Classic script. */
(function () {
  "use strict";
  var card = document.getElementById("quizCard");
  if (!card) return;

  var CLOSET = "https://poshmark.com/closet/the_armoire";
  var CAT_URL = {
    dresses: CLOSET + "?department=Women&category=Dresses",
    tops: CLOSET + "?department=Women&category=Tops",
    bottoms: CLOSET + "?department=Women&category=Skirts",
    shoes: CLOSET + "?department=Women&category=Shoes",
    accessories: CLOSET + "?department=Women&category=Accessories"
  };
  var CAT_LABEL = { dresses: "dresses", tops: "tops", bottoms: "bottoms", shoes: "shoes", accessories: "accessories" };
  var L = "https://poshmark.com/listing/";

  // occ: gala, garden, everyday, themed · sty: romantic, sparkle, classic. First tag in each list is the strongest fit.
  // Tags follow each maker's era and look: Gunne Sax / Jessica McClintock = 1970s romantic prairie,
  // Mike Benet = 1960s evening, Badgley Mischka = bridal and evening sparkle.
  var P = [
    { c: "dresses", n: "1950s periwinkle tulle prom dress", m: "XS · $260", img: "dress-periwinkle", u: L + "66e38bffdc8a4eb356a42b8a", o: ["gala", "themed"], s: ["romantic", "sparkle"] },
    { c: "dresses", n: "1960s Mike Benet red ballgown", m: "S · $220", img: "dress-60s-red-ballgown", u: L + "6a4ecd50149377eedca63f2e", o: ["gala"], s: ["sparkle", "classic"] },
    { c: "dresses", n: "Black and white embroidered tulle gown", m: "XXS · $220", img: "dress-black-white-tulle", u: L + "68c53c8e24d2e7bc7f7feb3c", o: ["gala", "themed"], s: ["classic", "sparkle"] },
    { c: "dresses", n: "Green lace-up gown, made by hand", m: "S · $270", img: "dress-green-gown", u: L + "68b8820905deb326d69931b7", o: ["themed", "gala"], s: ["romantic"] },
    { c: "dresses", n: "Gunne Sax floral midi", m: "M · $225", img: "dress-gunne-floral", u: L + "6a3fd629dc3b46ebd5fa3e45", o: ["garden", "themed"], s: ["romantic"] },
    { c: "dresses", n: "1950s mint lace cocktail dress", m: "XXS · $90", img: "dress-mint-lace", u: L + "63050879c9a228266d40e613", o: ["gala", "garden"], s: ["classic"] },
    { c: "dresses", n: "Vintage blue strapless midi", m: "XS · $150", img: "dress-blue-strapless", u: L + "6a3fd6a82326c8af62ca8194", o: ["garden", "everyday"], s: ["classic"] },
    { c: "dresses", n: "1960s and 70s smocked boho maxi", m: "XS · $90", img: "dress-bohemian-smocked", u: L + "68b9e4c4d8024c108416e5d9", o: ["garden", "everyday"], s: ["romantic"] },
    { c: "dresses", n: "Vintage chiffon prairie gown", m: "S · $64", img: "dress-prairie-chiffon", u: L + "68b9b8b705deb39ebaaa8b92", o: ["themed", "everyday"], s: ["romantic", "classic"] },
    { c: "dresses", n: "Vintage off-the-shoulder maxi dress", m: "S · $82", img: "dress-offshoulder-sunset", u: L + "65eb699a678c3a23248a9589", o: ["everyday", "garden"], s: ["romantic", "classic"] },

    { c: "tops", n: "Gunne Sax gold lace corset top", m: "S · $50", img: "top-gunne-gold-corset", u: L + "6a2b73bc2981af8bf9db46b2", o: ["gala", "themed"], s: ["sparkle", "romantic"] },
    { c: "tops", n: "Ulla Johnson blush pullover", m: "S · $72", img: "top-ulla-blush", u: L + "69601ffa006e4334fc563461", o: ["garden", "everyday"], s: ["romantic"] },
    { c: "tops", n: "Mint bubble blouse, new with tags", m: "$34", img: "top-mint-blouse", u: L + "6900e95fc4e7b4966e319ed4", o: ["garden", "gala"], s: ["classic", "romantic"] },
    { c: "tops", n: "1970s feather print tunic", m: "M · $25", img: "top-70s-feather-tunic", u: L + "69a9b615b7f0acbc2bd0091c", o: ["themed", "everyday"], s: ["sparkle", "romantic"] },
    { c: "tops", n: "Lucky Brand silk blouse", m: "M · $19", img: "top-silk-blouse", u: L + "68c19afc21bd427723f45787", o: ["everyday"], s: ["classic"] },

    { c: "bottoms", n: "Rose gold sequin circle maxi skirt", m: "$110", img: "skirt-rosegold-greenhouse", u: L + "5c4a30732e1478dd88fd38a9", o: ["gala", "garden"], s: ["sparkle", "romantic"] },
    { c: "bottoms", n: "Silver sequin ball gown skirt", m: "$110", img: "skirt-silver-sequin", u: L + "5b1c38e38ad2f974840cd452", o: ["gala"], s: ["sparkle", "classic"] },
    { c: "bottoms", n: "Aqua sequin maxi skirt", m: "$110", img: "skirt-aqua-sequin", u: L + "6132e48c941f1702a5af461d", o: ["themed", "gala"], s: ["sparkle"] },
    { c: "bottoms", n: "Violet sequin maxi skirt", m: "$110", img: "skirt-purple-sequin", u: L + "61316bf7efd0e4190c78474b", o: ["themed", "gala"], s: ["sparkle", "romantic"] },
    { c: "bottoms", n: "Sunshine gold sequin maxi skirt", m: "$110", img: "skirt-sunshine-sequin", u: L + "6132e902163df453739d4fbd", o: ["garden", "themed"], s: ["sparkle"] },
    { c: "bottoms", n: "Gold sequin circle skirt", m: "$120", img: "skirt-gold-sequin", u: L + "5c4bccd445c8b38e94e9adcf", o: ["gala", "everyday"], s: ["sparkle", "classic"] },
    { c: "bottoms", n: "Blush sequin maxi skirt with pockets", m: "S · $180", img: "skirt-blush-sequin", u: L + "612cf4b3bcbb52d4fdaa7ebf", o: ["garden", "gala"], s: ["romantic", "sparkle"] },
    { c: "bottoms", n: "Gunne Sax eyelet floral skirt", m: "XXS · $90", img: "skirt-gunnies-floral", u: L + "6914dd117ac629c343daec70", o: ["garden", "everyday"], s: ["romantic"] },
    { c: "bottoms", n: "Gunne Sax taffeta midi", m: "$65", img: "skirt-gunne-taffeta", u: L + "5e238124138e18adbe7c2f5d", o: ["garden", "themed"], s: ["classic", "romantic"] },
    { c: "bottoms", n: "Gunne Sax red velvet skirt", m: "S · $56", img: "skirt-red-velvet", u: L + "604641e206d59c341cfbee9b", o: ["everyday", "themed"], s: ["classic", "romantic"] },

    { c: "shoes", n: "Badgley Mischka ivory jewel heels", m: "8.5 · $150", img: "shoe-badgley", u: L + "68f2239b7ac6296029bd476d", o: ["gala"], s: ["sparkle", "classic"] },
    { c: "shoes", n: "Jeffrey Campbell lattice heels", m: "7.5 · $50", img: "shoe-jc-lattice", u: L + "68d2872124b20b4ce80cb79d", o: ["gala", "garden"], s: ["classic", "romantic"] },
    { c: "shoes", n: "Cole Haan black patent booties", m: "8 · $78", img: "shoe-cole-haan-booties", u: L + "688986effe4c6879470b887d", o: ["everyday", "gala"], s: ["classic"] },
    { c: "shoes", n: "Vintage embroidered lace-up boots", m: "7 · $70", img: "shoe-vintage-embroidered-boots", u: L + "68e187ea1986c2da9d37d282", o: ["themed", "everyday"], s: ["romantic"] },
    { c: "shoes", n: "UGG lace wrap wedge sandals", m: "7 · $45", img: "shoe-ugg-lace-wedge", u: L + "650f72fa58083dd1f318a810", o: ["garden", "everyday"], s: ["romantic", "classic"] },
    { c: "shoes", n: "Tommy Hilfiger lace-up ankle boots", m: "9.5 · $79", img: "shoe-tommy-boots", u: L + "68e14da67ac62977840fb361", o: ["everyday", "themed"], s: ["classic"] },

    { c: "accessories", n: "AB crystal golden crown", m: "$65", img: "acc-crystal-crown", u: L + "61e9cc679c3378ad1f63209d", o: ["gala", "themed"], s: ["sparkle"] },
    { c: "accessories", n: "Golden crest vine crown", m: "$65", img: "acc-crest-crown-black", u: L + "61ea13b909d7609f9c4c943b", o: ["gala", "garden"], s: ["romantic", "sparkle"] },
    { c: "accessories", n: "Crystal jewel earrings", m: "$18", img: "acc-crystal-earrings", u: L + "5de22c81264a55a83e379042", o: ["gala"], s: ["sparkle", "classic"] },
    { c: "accessories", n: "Fairy wing earrings", m: "$16", img: "acc-butterfly-earrings", u: L + "62ae68f2941f176987d1efe8", o: ["themed", "garden"], s: ["romantic", "sparkle"] },
    { c: "accessories", n: "Royal crystal ring", m: "$30", img: "acc-royal-ring", u: L + "62ae347f5d7f875eab739ff7", o: ["gala", "themed"], s: ["sparkle", "classic"] },
    { c: "accessories", n: "Vintage charm bracelet watch", m: "$25", img: "acc-charm-bracelet", u: L + "68f0de94149377eb908fcb94", o: ["everyday", "garden"], s: ["romantic"] },
    { c: "accessories", n: "Aimee Kestenberg quilted crossbody", m: "$50", img: "acc-bag", u: L + "68f1946f3509d131c6636caf", o: ["everyday"], s: ["classic"] }
  ];

  var Q = [
    { key: "c", title: "What are you shopping for?", type: "photos", opts: [
      ["dresses", "Dresses", "dress-mint-lace"], ["tops", "Tops", "top-ulla-blush"], ["bottoms", "Bottoms", "skirt-rosegold-greenhouse"],
      ["shoes", "Shoes", "shoe-badgley"], ["accessories", "Accessories", "acc-crystal-crown"]] },
    { key: "o", title: "Where are you wearing it?", type: "pills", opts: [
      ["gala", "A wedding or gala"], ["garden", "A garden party or brunch"], ["everyday", "Everyday"], ["themed", "A themed event or fair"]] },
    { key: "s", title: "Which feels most like you?", type: "pills three", opts: [
      ["romantic", "Romantic vintage"], ["sparkle", "Sparkle and shine"], ["classic", "Clean and classic"]] }
  ];

  var ans = {}, step = 0;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  // Only pieces from the chosen category. Occasion and style matches score 2 each, plus 0.5 when it is the
  // piece's strongest tag. Ties are ordered by a hash of the answers, so each answer set gets its own mix.
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function picks() {
    var key = ans.o + "|" + ans.s;
    return P.filter(function (p) { return p.c === ans.c; }).map(function (p) {
      var sc = (p.o.indexOf(ans.o) > -1 ? 2 : 0) + (p.s.indexOf(ans.s) > -1 ? 2 : 0) +
        (p.o[0] === ans.o ? 0.5 : 0) + (p.s[0] === ans.s ? 0.5 : 0);
      return { p: p, sc: sc, t: hash(key + p.img) };
    }).sort(function (a, b) { return b.sc - a.sc || a.t - b.t; }).slice(0, 3).map(function (x) { return x.p; });
  }

  function render(focus) {
    var html;
    if (step < Q.length) {
      var q = Q[step];
      var opts = q.opts.map(function (o) {
        var pressed = ans[q.key] === o[0] ? "true" : "false";
        if (q.type === "photos") {
          return '<button type="button" class="choice choice--photo" data-v="' + o[0] + '" aria-pressed="' + pressed + '">' +
            '<span class="arch"><img src="assets/img/' + o[2] + '.jpg" width="600" height="800" alt="" loading="lazy"></span>' +
            '<span class="lbl">' + esc(o[1]) + '</span></button>';
        }
        return '<button type="button" class="choice choice--pill" data-v="' + o[0] + '" aria-pressed="' + pressed + '">' + esc(o[1]) + '</button>';
      }).join("");
      var dots = Q.map(function (_, i) { return '<i' + (i <= step ? ' class="on"' : '') + '></i>'; }).join("");
      // phones show "Question 1 of 3" with one filling line (the three short bars read as swipe dots there)
      var meter = '<div class="q__meter" aria-hidden="true"><span>Question ' + (step + 1) + ' of ' + Q.length + '</span>' +
        '<span class="q__bar"><i style="width:' + Math.round((step + 1) / Q.length * 100) + '%"></i></span></div>';
      html = '<div class="q__fade">' + meter +
        '<div class="q__head"><h3 class="q__title" tabindex="-1"><span class="sr-only">Question ' + (step + 1) + ' of ' + Q.length + ': </span>' + esc(q.title) + '</h3>' +
        (step === 0 ? '<p class="q__note" aria-hidden="true">Pick one to start!</p>' : '') + '</div>' +
        '<div class="q__choices q__choices--' + q.type + '" role="group" aria-label="' + esc(q.title) + '">' + opts + '</div>' +
        '<div class="q__foot">' + (step > 0 ? '<button type="button" class="q__back" data-act="back">Back</button>' : '<span></span>') +
        '<span class="q__steps" aria-hidden="true">' + dots + '</span><span></span></div>' +
        '</div>';
    } else {
      var list = picks();
      html = '<div class="q__fade">' +
        '<h3 class="q__title" tabindex="-1">Your three picks</h3>' +
        '<div class="r__grid">' + list.map(function (p) {
          return '<div class="item r__card">' +
            '<a class="arch" href="' + p.u + '" target="_blank" rel="noopener"><img src="assets/img/' + p.img + '.jpg" width="600" height="800" alt="' + esc(p.n) + '" loading="lazy"></a>' +
            '<span class="cap__name">' + esc(p.n) + '</span><span class="cap__meta">' + esc(p.m) + '</span>' +
            '<a class="btn btn--outline" href="' + p.u + '" target="_blank" rel="noopener">Shop this piece</a></div>';
        }).join("") + '</div>' +
        '<div class="r__actions"><a class="btn" href="' + CAT_URL[ans.c] + '" target="_blank" rel="noopener">Shop all ' + CAT_LABEL[ans.c] + '</a>' +
        '<button type="button" class="q__back" data-act="restart">Start over</button></div>' +
        '</div>';
    }
    card.innerHTML = html;
    card.dataset.step = String(step + 1);
    if (focus) { var t = card.querySelector(".q__title"); if (t) t.focus({ preventScroll: true }); }
  }

  card.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.act === "back") { step = Math.max(0, step - 1); render(true); return; }
    if (b.dataset.act === "restart") { ans = {}; step = 0; render(true); return; }
    if (b.dataset.v && step < Q.length) {
      ans[Q[step].key] = b.dataset.v;
      step++;
      render(true);
    }
  });

  render(false);
  window.Site = window.Site || {};
  window.Site.quizPicks = picks;
  window.Site.quizSet = function (a) { ans = a; };
})();
