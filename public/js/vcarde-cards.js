/**
 * VCARDe gold cards — vanilla browser JS.
 * Drop this file + /cards/*.png onto any static host
 * (OpenLiteSpeed, Apache, Nginx). No Node.js required.
 *
 * Usage:
 *   <div id="vcarde-cards"></div>
 *   <script src="/js/vcarde-cards.js"></script>
 */
(function () {
  var CARDS = [
    { src: "/cards/vcarde-gold-uv.png", name: "VCARDe Gold UV", brand: "VCARDe" },
    { src: "/cards/gnk-gold-foil.png", name: "GNK Gold Foil", brand: "GNK Services" },
    { src: "/cards/vcarde-mandala.png", name: "NFC and paper cards", brand: "VCARDe" },
  ];

  function paint(canvas, src) {
    var img = new Image();
    img.onload = function () {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      var w = img.naturalWidth || 920;
      var h = img.naturalHeight || 520;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      var ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.drawImage(img, 0, 0, w, h);
    };
    img.src = src;
  }

  function mount(root) {
    if (!root) return;
    root.setAttribute("data-vcarde-cards", "1");
    root.style.position = "relative";
    var active = 0;
    var nodes = CARDS.map(function (card, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", card.brand + " " + card.name);
      btn.style.cssText =
        "position:absolute;inset:8% 6%;border:0;padding:0;background:transparent;cursor:pointer;border-radius:12px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,.45);transition:transform .4s ease,opacity .4s ease;";
      var canvas = document.createElement("canvas");
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", card.brand + " — " + card.name);
      canvas.style.display = "block";
      canvas.style.width = "100%";
      paint(canvas, card.src);
      btn.appendChild(canvas);
      btn.addEventListener("click", function () {
        active = i;
        layout();
      });
      root.appendChild(btn);
      return btn;
    });

    var caption = document.createElement("p");
    caption.style.cssText =
      "position:absolute;left:0;right:0;bottom:4px;margin:0;text-align:center;font:12px/1.4 sans-serif;color:#c9a84c;";
    root.appendChild(caption);

    function layout() {
      nodes.forEach(function (btn, i) {
        var offset = i - active;
        var wrapped = ((offset + CARDS.length + 1) % CARDS.length) - 1;
        var front = wrapped === 0;
        btn.style.transform =
          "translateX(" + wrapped * 18 + "%) rotate(" + wrapped * -8 + "deg) scale(" + (front ? 1 : 0.86) + ")";
        btn.style.zIndex = front ? "3" : String(2 - Math.abs(wrapped));
        btn.style.opacity = front ? "1" : "0.55";
      });
      caption.textContent = CARDS[active].brand + " · " + CARDS[active].name;
    }

    layout();
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      setInterval(function () {
        active = (active + 1) % CARDS.length;
        layout();
      }, 3800);
    }
  }

  function boot() {
    mount(document.getElementById("vcarde-cards"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
