/* SIAM.DEV — interactions only. No content is generated or loaded by this file. */
(function(){
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); });
    });
  }

  /* Theme toggle (dark default, light optional) */
  var themeBtn = document.querySelector(".theme-toggle");
  var saved = null;
  try { saved = localStorage.getItem("siamdev-theme"); } catch(e) {}
  if (saved === "light") { document.body.classList.add("light"); }
  if (themeBtn) {
    themeBtn.addEventListener("click", function(){
      var light = document.body.classList.toggle("light");
      try { localStorage.setItem("siamdev-theme", light ? "light" : "dark"); } catch(e) {}
      themeBtn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  /* Back to top */
  var toTop = document.querySelector(".back-to-top");
  if (toTop) {
    window.addEventListener("scroll", function(){
      toTop.classList.toggle("show", window.scrollY > 400);
    }, { passive:true });
    toTop.addEventListener("click", function(){
      window.scrollTo({ top:0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* Scroll reveal (progressive enhancement only) */
  if (!prefersReduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("visible"); });
  }

  /* Copy code buttons (buttons exist in the HTML; this only wires the click) */
  document.querySelectorAll(".copy-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      var pre = btn.closest("pre");
      var code = pre ? pre.querySelector("code") : null;
      if (!code) return;
      var done = function(){
        btn.textContent = "Copied";
        setTimeout(function(){ btn.textContent = "Copy"; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.textContent).then(done, function(){ fallbackCopy(code.textContent); done(); });
      } else { fallbackCopy(code.textContent); done(); }
    });
  });
  function fallbackCopy(text){
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly","");
    ta.style.position = "absolute"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch(e) {}
    document.body.removeChild(ta);
  }

  /* Contact form: validate, then open the visitor's email app via mailto.
     Nothing is sent automatically; no form service is connected yet. */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function(ev){
      ev.preventDefault();
      var ok = true;
      var name = document.getElementById("cf-name");
      var email = document.getElementById("cf-email");
      var subject = document.getElementById("cf-subject");
      var message = document.getElementById("cf-message");
      function check(field, valid){
        var wrap = field.closest(".form-field");
        if (wrap) wrap.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      }
      check(name, name.value.trim().length >= 2);
      check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      check(subject, subject.value.trim().length >= 2);
      check(message, message.value.trim().length >= 10);
      if (!ok) {
        var firstBad = form.querySelector(".form-field.invalid input, .form-field.invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }
      var body = "Hi SP Siam Ahmed,%0D%0A%0D%0A" + encodeURIComponent(message.value.trim())
        + "%0D%0A%0D%0A— " + encodeURIComponent(name.value.trim())
        + " (" + encodeURIComponent(email.value.trim()) + ")";
      window.location.href = "mailto:spsiamahmed1111@gmail.com?subject=" +
        encodeURIComponent(subject.value.trim()) + "&body=" + body;
      var note = document.getElementById("form-status");
      if (note) note.textContent = "Your email app should now open with the message ready to send.";
    });
  }
})();
