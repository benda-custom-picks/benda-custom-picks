// BENDAGO SAFE SumUp payment switch.
// Safety rule: this file does not touch product media or layout.
// It only replaces the main payment/request button URL and label on product pages.
(function () {
  var sumupLinks = {
    "order-black-striped-clutch-cover.html": { name: 'Black Ribbed Clutch Cover', price: '119 € TTC', url: 'https://pay.sumup.com/b2c/Q9VN0MTA' },
    "order-gold-clutch-flywheel.html": { name: 'Gold Clutch Inner Accent', price: '168 € TTC', url: 'https://pay.sumup.com/b2c/QG91N8HI' },
    "order-transparent-clutch-cover.html": { name: 'Clear Clutch Window Cover', price: '184 € TTC', url: 'https://pay.sumup.com/b2c/QCIGV1GF' },
    "order-future-led-light.html": { name: 'Future Front Light Upgrade', price: '182 € TTC', url: 'https://pay.sumup.com/b2c/QKDUHQ6J' },
    "order-tank-cover-support-volume.html": { name: 'Tank Volume Cover', price: '187 € TTC', url: 'https://pay.sumup.com/b2c/QDQRVQ8D' },
    "order-closed-metal-hubcap-benda-samurai.html": { name: 'Samurai Wheel Cover', price: '199 € TTC', url: 'https://pay.sumup.com/b2c/Q12U5SQL' },
    "order-rear-arch-luggage-rack.html": { name: 'Rear Arch Support Rack', price: '191 € TTC', url: 'https://pay.sumup.com/b2c/QSWPEIYS' },
    "order-metal-foot-controls.html": { name: 'Bronze Foot Control Kit', price: '306 € TTC', url: 'https://pay.sumup.com/b2c/QDY4J3FB' },
    "order-double-seat-foot-peg-kit.html": { name: 'Comfort Seat & Foot Peg Kit', price: '590 € TTC', url: 'https://pay.sumup.com/b2c/QA9QRRRN' },
    "order-premium-double-seat.html": { name: 'Premium Comfort Double Seat', price: '641 € TTC', url: 'https://pay.sumup.com/b2c/QCXN26NP' },
    "order-gps-carplay.html": { name: 'GPS / CarPlay screen for Benda Napoleon 125/250', price: '105 € TTC', url: 'https://pay.sumup.com/b2c/QAJUVD3U' },
    "order-chrome-engine-cover.html": { name: 'Chrome Air Side Cover', price: '261 € TTC', url: 'https://pay.sumup.com/b2c/QNTNCVJW' },
    "order-rear-fender.html": { name: 'Rear Clean Fender Kit', price: '283 € TTC', url: 'https://pay.sumup.com/b2c/Q5N50MJX' },
    "order-left-side-bag-support.html": { name: 'Left Side Travel Bag Kit', price: '221 € TTC', url: 'https://pay.sumup.com/b2c/QJH4CGUO' },
    "order-left-premium-engine-cover.html": { name: 'Premium Left Engine Cover', price: '479 € TTC', url: 'https://pay.sumup.com/b2c/Q1REVF13' },
    "order-dual-exhaust.html": { name: 'Dual Exhaust Custom Kit', price: '579 € TTC', url: 'https://pay.sumup.com/b2c/QSBDSEOT' },
    "order-right-engine-filter-cover.html": { name: 'Right Engine Side Cover', price: '136 € TTC', url: 'https://pay.sumup.com/b2c/QMQRL3QK' },
    "order-handlebar-riser.html": { name: 'Comfort Handlebar Riser Kit', price: '261 € TTC', url: 'https://pay.sumup.com/b2c/QNI21W2Q' },
    "order-fat-bob-bumper.html": { name: 'Fat Bob Front Bumper Kit', price: '637 € TTC', url: 'https://pay.sumup.com/b2c/QQGTWXCO' },
    "order-chassis-protection.html": { name: 'Lower Chassis Protection Plate', price: '454 € TTC', url: 'https://pay.sumup.com/b2c/QOGSM0WX' },
    "order-headlight-fairing.html": { name: 'Front Fairing Style Kit', price: '169 € TTC', url: 'https://pay.sumup.com/b2c/Q05YR41S' }
  };

  function setPaymentButton() {
    var page = (window.location.pathname.split("/").pop() || "").trim();
    var payment = sumupLinks[page];
    if (!payment) return;

    var candidates = Array.prototype.slice.call(document.querySelectorAll("a.buy-btn, a.js-request-link"));
    candidates = candidates.filter(function (a) {
      if (!a) return false;
      if (a.classList && a.classList.contains("secondary-btn")) return false;
      if (a.closest && a.closest(".order-links")) return false;
      return true;
    });

    if (!candidates.length) return;

    candidates.forEach(function (button) {
      button.href = payment.url;
      button.target = "_blank";
      button.rel = "noopener";
      button.textContent = "Pay securely by card →";
      button.setAttribute("aria-label", "Pay securely by card for " + payment.name);
      button.setAttribute("data-payment-provider", "sumup");
      button.setAttribute("data-product-name", payment.name);
      button.setAttribute("data-product-price", payment.price);
    });

    var priceNote = document.querySelector(".price-line p");
    if (priceNote) {
      priceNote.textContent = "Secure card payment by SumUp. Order starts after payment confirmation and supplier validation.";
    }

    var trustList = document.querySelector(".trust-list");
    if (trustList && !trustList.querySelector("[data-sumup-trust]")) {
      var line = document.createElement("div");
      line.setAttribute("data-sumup-trust", "true");
      line.textContent = "✓ Secure card payment by SumUp";
      trustList.insertBefore(line, trustList.firstChild);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setPaymentButton);
  } else {
    setPaymentButton();
  }
})();
