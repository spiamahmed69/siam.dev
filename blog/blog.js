/* SIAM.DEV Blog — search, category filter and pagination of EXISTING HTML cards only.
   No content is loaded, fetched or generated here. */
(function(){
  "use strict";
  var search = document.getElementById("blog-search");
  var grid = document.getElementById("article-grid");
  var empty = document.getElementById("no-results");
  var pager = document.getElementById("blog-pagination");
  var perPage = 6;
  var page = 1;
  var filter = "all";
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".article-card, .post-card"));

  function apply(){
    var q = search ? search.value.trim().toLowerCase() : "";
    var visible = cards.filter(function(card){
      var text = card.textContent.toLowerCase();
      var cat = card.getAttribute("data-category") || "";
      var okQ = !q || text.indexOf(q) !== -1;
      var okF = filter === "all" || cat === filter;
      return okQ && okF;
    });
    cards.forEach(function(card){ card.classList.add("hidden"); });
    var pages = Math.max(1, Math.ceil(visible.length / perPage));
    if (page > pages) page = pages;
    visible.slice((page - 1) * perPage, page * perPage).forEach(function(card){
      card.classList.remove("hidden");
    });
    if (empty) empty.classList.toggle("show", visible.length === 0);
    renderPager(pages);
  }
  function renderPager(pages){
    if (!pager) return;
    while (pager.firstChild) { pager.removeChild(pager.firstChild); }
    if (pages <= 1) return;
    for (var i = 1; i <= pages; i++) {
      (function(n){
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = String(n);
        b.setAttribute("aria-label", "Page " + n);
        if (n === page) b.classList.add("active");
        b.addEventListener("click", function(){ page = n; apply(); });
        pager.appendChild(b);
      })(i);
    }
  }
  if (search) search.addEventListener("input", function(){ page = 1; apply(); });
  document.querySelectorAll(".filter-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll(".filter-btn").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      filter = btn.getAttribute("data-filter") || "all";
      page = 1;
      apply();
    });
  });
  apply();
})();
