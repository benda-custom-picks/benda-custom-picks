/* BENDAGO ORDER + CART CHECKOUT FLOW */
const BENDAGO_PRODUCTS = {
  "black-striped-clutch-cover": {
    product_code: "black-striped-clutch-cover",
    product_name: 'Black Ribbed Clutch Cover',
    product_short: 'Black ribbed clutch cover Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '119 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './black-striped-clutch-cover-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/Q9VN0MTA'
  },
  "gold-clutch-flywheel": {
    product_code: "gold-clutch-flywheel",
    product_name: 'Gold Clutch Inner Accent',
    product_short: 'Gold inner clutch accent Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '168 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './gold-clutch-flywheel-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QG91N8HI'
  },
  "transparent-clutch-cover": {
    product_code: "transparent-clutch-cover",
    product_name: 'Clear Clutch Window Cover',
    product_short: 'Transparent clutch window cover Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '184 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './transparent-clutch-cover-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QCIGV1GF'
  },
  "future-led-light": {
    product_code: "future-led-light",
    product_name: 'Future Front Light Upgrade',
    product_short: 'Future front light upgrade Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '182 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './future-led-light-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QKDUHQ6J'
  },
  "tank-cover-support-volume": {
    product_code: "tank-cover-support-volume",
    product_name: 'Tank Volume Cover',
    product_short: 'Tank cover / support volume Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '187 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './tank-cover-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QDQRVQ8D'
  ,
    color_required: true,
    color_options: "Black / Green / Grey"
  },
  "closed-metal-hubcap-benda-samurai": {
    product_code: "closed-metal-hubcap-benda-samurai",
    product_name: 'Samurai Wheel Cover',
    product_short: 'Closed metal hubcap / Samurai wheel cover',
    fitment: 'Benda Napoleon 125/250',
    price: '199 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './closed-metal-hubcap-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/Q12U5SQL'
  },
  "rear-arch-luggage-rack": {
    product_code: "rear-arch-luggage-rack",
    product_name: 'Rear Arch Support Rack',
    product_short: 'Rear arch support rack Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '191 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './rear-arch-luggage-rack-retouched-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QSWPEIYS'
  },
  "metal-foot-controls": {
    product_code: "metal-foot-controls",
    product_name: 'Bronze Foot Control Kit',
    product_short: 'Metal gear/brake foot controls Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '306 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './metal-foot-controls-hero.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QDY4J3FB'
  },
  "double-seat-foot-peg-kit": {
    product_code: "double-seat-foot-peg-kit",
    product_name: 'Comfort Seat & Foot Peg Kit',
    product_short: 'Comfort seat and foot peg kit Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '590 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './premium-double-seat-hero-v3.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QA9QRRRN'
  },
  "premium-double-seat": {
    product_code: "premium-double-seat",
    product_name: 'Premium Comfort Double Seat',
    product_short: 'Premium comfort double seat Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '641 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './premium-double-seat-hero-v3.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QCXN26NP'
  },
  "gps-carplay": {
    product_code: "gps-carplay",
    product_name: 'GPS / CarPlay screen for Benda Napoleon 125/250',
    product_short: 'GPS / CarPlay screen Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '105 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './carplay-benda.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QAJUVD3U'
  },
  "chrome-engine-cover": {
    product_code: "chrome-engine-cover",
    product_name: 'Chrome Air Side Cover',
    product_short: 'Chrome left-side air filter cover Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '261 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './air_filter_cover_chrome_left_01_detail.png',
    sumup_url: 'https://pay.sumup.com/b2c/QNTNCVJW'
  },
  "rear-fender": {
    product_code: "rear-fender",
    product_name: 'Rear Clean Fender Kit',
    product_short: 'Rear clean fender kit Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '283 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './rear_fender_05_side_profile.png',
    sumup_url: 'https://pay.sumup.com/b2c/Q5N50MJX'
  },
  "left-side-bag-support": {
    product_code: "left-side-bag-support",
    product_name: 'Left Side Travel Bag Kit',
    product_short: 'Left side travel bag and support Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '221 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './left_side_bag_00_mount_bar_detail.png',
    sumup_url: 'https://pay.sumup.com/b2c/QJH4CGUO'
  },
  "left-premium-engine-cover": {
    product_code: "left-premium-engine-cover",
    product_name: 'Premium Left Engine Cover',
    product_short: 'Premium left engine cover Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '479 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './left-engine-cover-2-closeup.png',
    sumup_url: 'https://pay.sumup.com/b2c/Q1REVF13'
  },
  "dual-exhaust": {
    product_code: "dual-exhaust",
    product_name: 'Dual Exhaust Custom Kit',
    product_short: 'Dual exhaust custom kit Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '512 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './dual-exhaust-card-hero.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QPDLYF56'
  },
  "right-engine-filter-cover": {
    product_code: "right-engine-filter-cover",
    product_name: 'Right Engine Side Cover',
    product_short: 'Right engine filter-style cover Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '136 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './standby-product-visual.png',
    sumup_url: 'https://pay.sumup.com/b2c/QMQRL3QK'
  },
  "handlebar-riser": {
    product_code: "handlebar-riser",
    product_name: 'Comfort Handlebar Riser Kit',
    product_short: 'Comfort handlebar riser kit Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '261 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './standby-product-visual.png',
    sumup_url: 'https://pay.sumup.com/b2c/QNI21W2Q'
  },
  "fat-bob-bumper": {
    product_code: "fat-bob-bumper",
    product_name: 'Fat Bob Front Bumper Kit',
    product_short: 'Fat Bob front bumper kit Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '637 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './product-bumper-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QQGTWXCO'
  },
  "chassis-protection": {
    product_code: "chassis-protection",
    product_name: 'Lower Chassis Protection Plate',
    product_short: 'Lower chassis protection plate Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '454 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './product-chassis-1.webp',
    sumup_url: 'https://pay.sumup.com/b2c/QOGSM0WX'
  },
  "headlight-fairing": {
    product_code: "headlight-fairing",
    product_name: 'Front Fairing Style Kit',
    product_short: 'Front fairing style kit Napoleon 125/250',
    fitment: 'Benda Napoleon 125/250',
    price: '169 € TTC',
    delivery_estimate: '10 to 15 days',
    image: './fairing-hero.png',
    sumup_url: 'https://pay.sumup.com/b2c/Q05YR41S'
  }
};

window.BENDAGO_PRODUCTS = BENDAGO_PRODUCTS;

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

const BENDAGO_CART_KEY = 'bendago_cart_v1';

function bendagoReadCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(BENDAGO_CART_KEY) || '[]');
    return Array.isArray(cart) ? cart.filter(item => item && item.code && item.qty > 0) : [];
  } catch (e) {
    return [];
  }
}

function bendagoSaveCart(cart) {
  localStorage.setItem(BENDAGO_CART_KEY, JSON.stringify(cart));
}

function bendagoProductCodeFromLink(link) {
  try {
    const href = link.getAttribute('href') || '';
    const url = new URL(href, window.location.href);
    const part = url.searchParams.get('part');
    if (part) return part;
  } catch (e) {}
  const current = String(window.location.pathname || '').match(/order-([^/]+)\.html$/);
  return current ? current[1] : '';
}

function bendagoAddOneToCart(code) {
  if (!code || !BENDAGO_PRODUCTS[code]) return false;
  const cart = bendagoReadCart();
  const existing = cart.find(item => item.code === code);
  if (existing) existing.qty += 1;
  else cart.push({ code, qty: 1 });
  bendagoSaveCart(cart);
  return true;
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
    link.textContent = 'Add to cart →';
    link.setAttribute('aria-label', 'Add this part to cart');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const code = bendagoProductCodeFromLink(link);
      const added = bendagoAddOneToCart(code);
      bendagoPush('product_detail_add_to_cart', {
        product_code: code,
        product_name: link.getAttribute('data-product-name') || document.title,
        product_url: window.location.href
      });
      if (added) window.location.href = './cart-request.html';
      else window.location.href = link.getAttribute('href') || './cart-request.html';
    });
  });

  const form = document.getElementById('orderRequestForm');
  if (!form) return;

  const product = getProductFromUrl();
  setText('[data-product-name-text]', product.product_name);
  setText('[data-product-fitment-text]', product.fitment);
  const miniImg = document.querySelector('[data-product-image]');
  if (miniImg) miniImg.src = product.image;

  const colorField = document.getElementById('colorOptionField');
  const colorSelect = document.getElementById('colorOptionSelect');
  if (colorField && colorSelect) {
    const label = colorField.querySelector('label');
    if (product.color_required) {
      if (label) label.textContent = 'Tank cover colour *';
      colorSelect.required = true;
      const first = colorSelect.querySelector('option[value=""]');
      if (first) first.textContent = 'Choose colour';
    } else {
      if (label) label.textContent = 'Colour / option';
      colorSelect.required = false;
      const first = colorSelect.querySelector('option[value=""]');
      if (first) first.textContent = 'To confirm / not applicable';
    }
  }

  setValue('product_code', product.product_code);
  setValue('product_name', product.product_name);
  setValue('product_short', product.product_short);
  setValue('price', product.price);
  setValue('fitment', product.fitment);
  setValue('delivery_estimate', product.delivery_estimate);
  setValue('request_page', window.location.href);
  setValue('referrer', document.referrer || 'direct');
  setValue('sumup_url', product.sumup_url);
  setValue('payment_url', product.sumup_url);
  setValue('payment_provider', 'SumUp');

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
    data.sumup_url = product.sumup_url;
    data.payment_url = product.sumup_url;
    data.payment_provider = 'SumUp';
    data.order_status_message = 'Checkout details received. Continue to secure SumUp card payment.';
    data.tracking_note = 'Tracking details are shared as soon as they are available after shipment.';
    data.processing_note = 'Order processed after secure SumUp payment confirmation.';

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Continuing checkout…';
      showStatus('ok', 'Preparing secure checkout…');

      if (window.emailjs && emailjs.init) emailjs.init({ publicKey: cfg.publicKey });

      await emailjs.send(cfg.serviceId, cfg.adminTemplateId, data);
      await emailjs.send(cfg.serviceId, cfg.clientTemplateId, data);

      bendagoPush('order_details_confirmed', {
        product_name: data.product_name,
        product_code: data.product_code,
        customer_country: data.country || '',
        request_id: data.request_id,
        payment_provider: 'sumup'
      });

      sessionStorage.setItem('bendago_last_request', JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        customer_name: data.customer_name,
        email: data.email,
        color_option: data.color_option || 'To confirm / not applicable',
        request_id: data.request_id,
        sumup_url: product.sumup_url
      }));

      window.location.href = './thank-you.html?request_id=' + encodeURIComponent(data.request_id);
    } catch (err) {
      console.error(err);
      showStatus('err', 'Checkout details could not be sent. Check EmailJS keys/templates, then try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Continue to secure payment';
    }
  });
});
