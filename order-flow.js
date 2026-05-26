/* BENDAGO V15 ORDER FLOW */
const BENDAGO_PRODUCTS = {
  "headlight-fairing": {
    product_code: "headlight-fairing",
    product_name: "Headlight Fairing / Bulle de phare",
    product_short: "Retro headlight fairing Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "PRICE TO CONFIRM",
    delivery_estimate: "10 to 20 days",
    image: "./fairing-hero.png"
  },
  "chassis-protection": {
    product_code: "chassis-protection",
    product_name: "Chassis Protection / Protection châssis",
    product_short: "Chassis protection plate Napoleon 125/250",
    fitment: "Benda Napoleon 125/250",
    price: "PRICE TO CONFIRM",
    delivery_estimate: "10 to 20 days",
    image: "./pchbob.png"
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

      window.location.href = './thank-you.html?request_id=' + encodeURIComponent(data.request_id);
    } catch (err) {
      console.error(err);
      showStatus('err', 'The request could not be sent. Check EmailJS keys/templates, then try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send order request';
    }
  });
});
