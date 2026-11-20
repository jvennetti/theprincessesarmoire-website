/* The Princesses Armoire: header state, section highlight, quiet scroll reveals. Classic script (works from file://). */
(function () {
  "use strict";
  window.Site = window.Site || {};
  var doc = document.documentElement;
  doc.classList.add("js");

  // Header hairline once the page scrolls.
  var head = document.querySelector(".site-head");
  function onScroll() { if (head) head.classList.toggle("is-stuck", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;

  // Highlight the nav link for the section on screen.
  var links = {};
  document.querySelectorAll(".cat-nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var a = links[e.target.id];
      if (a) a.classList.toggle("is-here", e.isIntersecting);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

  // Gentle reveals, once each. Content is visible without JS.
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var targets = document.querySelectorAll(".shelf .wrap > *, .logos, .gallery__row, .seam__grid > *, .direct__grid > *, .stats__row");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  targets.forEach(function (el, i) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) return; // already on screen: leave visible
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 3) * 80 + "ms";
    io.observe(el);
  });
})();
