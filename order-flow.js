/* BENDAGO V22.6 REQUEST ORDER FLOW - EmailJS manual payment mode */
const BENDAGO_PRODUCTS = {
  "chassis-protection": {
    product_code: "chassis-protection",
    product_name: "Chassis protection plate / lower deflector",
    product_short: "Chassis protection plate / lower deflector Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "454 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./chassis-protection-featured.webp"
  },
  "right-engine-filter-cover": {
    product_code: "right-engine-filter-cover",
    product_name: "Right engine filter-style cover Napoleon 125/250",
    product_short: "Right engine filter-style cover Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "136 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./standby-product-visual.png"
  },
  "headlight-fairing": {
    product_code: "headlight-fairing",
    product_name: "Headlight Fairing Front",
    product_short: "Retro headlight fairing Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "169 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./fairing-hero.png"
  },
  "fat-bob-bumper": {
    product_code: "fat-bob-bumper",
    product_name: "Fat Bob bumper Napoleon 125/250",
    product_short: "Fat Bob bumper Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "637 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./pchbob.png"
  },
  "handlebar-riser": {
    product_code: "handlebar-riser",
    product_name: "Handlebar riser comfort Napoleon 125/250",
    product_short: "Handlebar riser comfort Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "261 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./standby-product-visual.png"
  },
  "dual-exhaust": {
    product_code: "dual-exhaust",
    product_name: "Complete dual exhaust kit Napoleon 125/250¯9 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./complete-dual-exhaust-featured.webp"
  },
  "left-premium-engine-cover": {
    product_code: "left-premium-engine-cover",
    product_name: "Left premium engine cover Napoleon 125/250",
    product_short: "Left premium engine cover Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "479 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./left-engine-cover-2-closeup.png"
  },
  "left-side-bag-support": {
    product_code: "left-side-bag-support",
    product_name: "Left side bag + support Napoleon 125/250",
    product_short: "Left side bag + support Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "221 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./left_side_bag_03_bag_on_bike.png"
  },
  "rear-fender": {
    product_code: "rear-fender",
    product_name: "Rear fender Napoleon 125/250",
    product_short: "Rear fender Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "283 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./rear_fender_05_side_profile.png"
  },
  "chrome-engine-cover": {
    product_code: "chrome-engine-cover",
    product_name: "Air filter Cover Chrome left Napoleon 125/250",
    product_short: "Air filter Cover Chrome left Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "261 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./air_filter_cover_chrome_left_01_detail.png"
  },
  "gps-carplay": {
    product_code: "gps-carplay",
    product_name: "GPS / CarPlay screen for Benda Napoleon 125/250",
    product_short: "GPS / CarPlay screen for Benda Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "105 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./carplay-benda.webp"
  },
  "premium-double-seat": {
    product_code: "premium-double-seat",
    product_name: "Premium double seat Napoleon 125/250",
    product_short: "Premium double seat Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "867 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./standby-product-visual.png"
  },
  "double-seat-foot-peg-kit": {
    product_code: "double-seat-foot-peg-kit",
    product_name: "Double seat + foot peg kit Napoleon 125/250",
    product_short: "Double seat + foot peg kit Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "732 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./standby-product-visual.png"
  },
  "metal-foot-controls": {
    product_code: "metal-foot-controls",
    product_name: "Metal gear/brake foot controls Napoleon 125/250",
    product_short: "Metal gear/brake foot controls Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "306 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./metal-foot-controls-hero.webp"
  },
  "rear-arch-luggage-rack": {
    product_code: "rear-arch-luggage-rack",
    product_name: "Rear arch luggage rack",
    product_short: "Rear arch luggage rack",
    fitment: "Benda Napoleon 125/250",
    price: "191 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./rear-arch-luggage-rack-retouched-1.webp"
  },
  "closed-metal-hubcap-benda-samurai": {
    product_code: "closed-metal-hubcap-benda-samurai",
    product_name: "Closed metal hubcap — Benda Samurai",
    product_short: "Closed metal hubcap — Benda Samurai",
    fitment: "Benda Napoleon 125/250",
    price: "199 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./closed-metal-hubcap-retouched-1.webp"
  },
  "tank-cover-support-volume": {
    product_code: "tank-cover-support-volume",
    product_name: "Tank cover / support volume",
    product_short: "Tank cover / support volume",
    fitment: "Benda Napoleon 125/250",
    price: "187 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./tank-cover-retouched-1.webp"
  },
  "future-led-light": {
    product_code: "future-led-light",
    product_name: "Future LED light",
    product_short: "Future LED light",
    fitment: "Benda Napoleon 125/250",
    price: "182 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./future-led-light-retouched-1.webp"
  },
  "transparent-clutch-cover": {
    product_code: "transparent-clutch-cover",
    product_name: "Transparent clutch cover",
    product_short: "Transparent clutch cover",
    fitment: "Benda Napoleon 125/250",
    price: "184 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./transparent-clutch-cover-retouched-1.webp"
  },
  "gold-clutch-flywheel": {
    product_code: "gold-clutch-flywheel",
    product_name: "Gold clutch flywheel",
    product_short: "Gold clutch flywheel",
    fitment: "Benda Napoleon 125/250",
    price: "168 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./gold-clutch-flywheel-retouched-1.webp"
  },
  "black-striped-clutch-cover": {
    product_code: "black-striped-clutch-cover",
    product_name: "Black striped clutch cover",
    product_short: "Black striped clutch cover",
    fitment: "Benda Napoleon 125/250",
    price: "119 € TTC — payment request sent after validation",
    delivery_estimate: "10 to 20 days",
    image: "./black-striped-clutch-cover-retouched-1.webp"
  }
};

function bendagoPush(eventName, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

function getProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const part = params.get('part') || 'headlight-fairing';
  return BENDAGO_PRODUCTS[part] || BENDAGO_PRODUCTS['headlight-fairing'];
}

function setValue(name, value) {
  const el = document.querySelector(`[name="${name}"]`);
  if (el) el.value = value || '';
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value || '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-order-product]').forEach(el => {
    el.addEventListener('click', () => {
      bendagoPush('order_product_view_click', {
        product_name: el.getAttribute('data-order-product'),
        product_url: el.href || window.location.href
      });
    });
  });

  document.querySelectorAll('.product-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const main = document.querySelector('#mainProductImage');
      if (src && main) main.src = src;
    });
  });

  document.querySelectorAll('.js-request-link').forEach(link => {
    link.addEventListener('click', () => {
      bendagoPush('product_detail_request_click', {
        product_name: link.getAttribute('data-product-name') || document.title,
        product_url: window.location.href
      });
    });
  });

  const form = document.getElementById('orderRequestForm');
  if (!form) return;

  const product = getProductFromUrl();
  setText('[data-product-name-text]', product.product_name);
  setText('[data-product-fitment-text]', product.fitment);
  const miniImg = document.querySelector('[data-product-image]');
  if (miniImg) miniImg.src = product.image;

  setValue('product_code', product.product_code);
  setValue('product_name', product.product_name);
  setValue('product_short', product.product_short);
  setValue('price', product.price);
  setValue('fitment', product.fitment);
  setValue('delivery_estimate', product.delivery_estimate);
  setValue('request_page', window.location.href);
  setValue('referrer', document.referrer || 'direct');

  const qs = new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(key => setValue(key, qs.get(key) || ''));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('[type="submit"]');
    const cfg = window.BENDAGO_EMAILJS_CONFIG || {};

    function showStatus(type, message) {
      if (!status) return;
      status.className = 'status-box show ' + type;
      status.textContent = message;
    }

    if (!cfg.publicKey || cfg.publicKey.includes('PASTE_') || !cfg.serviceId || cfg.serviceId.includes('PASTE_')) {
      showStatus('err', 'EmailJS is not configured yet. Replace the placeholders in emailjs-config.js first.');
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    data.request_id = 'BENDAGO-' + Date.now();
    data.request_date = new Date().toLocaleString();
    data.customer_email = data.email;
    data.payment_status = 'Manual payment request pending';
    data.payment_instruction = 'Send manual PayPal payment request after product, color, address and availability are confirmed.';

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending request…';
      showStatus('ok', 'Sending your request…');

      if (window.emailjs && emailjs.init) emailjs.init({ publicKey: cfg.publicKey });

      await emailjs.send(cfg.serviceId, cfg.adminTemplateId, data);
      await emailjs.send(cfg.serviceId, cfg.clientTemplateId, data);

      bendagoPush('order_request_submit', {
        product_name: data.product_name,
        product_code: data.product_code,
        customer_country: data.country || '',
        request_id: data.request_id
      });

      sessionStorage.setItem('bendago_last_request', JSON.stringify({
        product_name: data.product_name,
        customer_name: data.customer_name,
        email: data.email,
        request_id: data.request_id
      }));

      showStatus('ok', 'Request order validated. We received your request and will send the payment request manually after validation.');
      alert('Request order validated. We received your request and will send the payment request manually after validation.');
      submitBtn.textContent = 'Request sent';
    } catch (err) {
      console.error(err);
      showStatus('err', 'The request could not be sent. Check EmailJS keys/templates, then try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Validate order request';
    }
  });
});
