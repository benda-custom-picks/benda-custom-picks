/* BENDAGO CART REQUEST FLOW V1 — secure SumUp payment after confirmation */
(function () {
  const CART_KEY = 'bendago_cart_v1';

  function push(eventName, params = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  }

  function readCart() {
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(cart) ? cart.filter(item => item && item.code && Number(item.qty) > 0) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function euroToNumber(value) {
    const match = String(value || '').replace(',', '.').match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? Number(match[1]) : 0;
  }

  function formatEuro(value) {
    return Math.round(value) + ' € TTC';
  }

  function getLines() {
    const products = window.BENDAGO_PRODUCTS || {};
    return readCart().map(item => {
      const product = products[item.code];
      if (!product) return null;
      const qty = Math.max(1, Number(item.qty) || 1);
      const unit = euroToNumber(product.price);
      return { ...product, code: item.code, qty, line_total: unit * qty };
    }).filter(Boolean);
  }

  function renderCartSummary() {
    const box = document.getElementById('cartSummary');
    if (!box) return;
    const lines = getLines();
    if (!lines.length) {
      box.innerHTML = '<h2>Your cart is empty</h2><p>Go back to the parts list and choose at least one Benda Napoleon part.</p><a class="yellow-btn" href="./index.html#order-selected-parts">Choose parts</a>';
      return;
    }
    const total = lines.reduce((sum, line) => sum + line.line_total, 0);
    box.innerHTML = '<h2>Selected parts</h2>' + lines.map(line =>
      '<div class="cart-summary-row"><span>' + line.product_name + ' × ' + line.qty + '</span><strong>' + formatEuro(line.line_total) + '</strong></div>'
    ).join('') + '<div class="cart-summary-total"><span>Total</span><strong>' + formatEuro(total) + '</strong></div>';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cartRequestForm');
    if (!form) return;

    renderCartSummary();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = document.getElementById('cartFormStatus');
      const submitBtn = form.querySelector('[type="submit"]');
      const cfg = window.BENDAGO_EMAILJS_CONFIG || {};
      const lines = getLines();

      function showStatus(type, message) {
        if (!status) return;
        status.className = 'status-box show ' + type;
        status.textContent = message;
      }

      if (!lines.length) {
        showStatus('err', 'Your cart is empty. Choose at least one Benda Napoleon part first.');
        return;
      }

      if (!cfg.publicKey || cfg.publicKey.includes('PASTE_') || !cfg.serviceId || cfg.serviceId.includes('PASTE_')) {
        showStatus('err', 'EmailJS is not configured yet.');
        return;
      }

      const formData = Object.fromEntries(new FormData(form).entries());
      const total = lines.reduce((sum, line) => sum + line.line_total, 0);
      const cartSummary = lines.map(line => line.product_name + ' x ' + line.qty + ' — ' + formatEuro(line.line_total)).join('\n');
      const first = lines[0];
      const isSingle = lines.length === 1 && first.qty === 1;
      const requestId = 'BENDAGO-CART-' + Date.now();

      const data = {
        ...formData,
        request_id: requestId,
        request_date: new Date().toLocaleString(),
        customer_email: formData.email,
        product_code: isSingle ? first.product_code : 'grouped-cart',
        product_name: isSingle ? first.product_name : 'Grouped Benda Napoleon cart',
        product_short: isSingle ? first.product_short : 'Grouped Benda Napoleon parts',
        price: isSingle ? first.price : formatEuro(total),
        fitment: 'Benda Napoleon 125 / 250',
        delivery_estimate: '10 to 15 days',
        payment_provider: 'SumUp',
        payment_url: isSingle ? first.sumup_url : '',
        sumup_url: isSingle ? first.sumup_url : '',
        cart_summary: cartSummary,
        cart_total: formatEuro(total),
        cart_count: String(lines.reduce((sum, line) => sum + line.qty, 0)),
        request_page: window.location.href,
        referrer: document.referrer || 'direct',
        order_status_message: 'Cart order request received. Secure SumUp payment after confirmation.',
        tracking_note: 'Delivery tracking is shared as soon as it is available after shipping.',
        processing_note: 'Order processed after secure SumUp payment confirmation.'
      };

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending request…';
        showStatus('ok', 'Sending cart order request…');

        if (window.emailjs && emailjs.init) emailjs.init({ publicKey: cfg.publicKey });
        await emailjs.send(cfg.serviceId, cfg.adminTemplateId, data);
        await emailjs.send(cfg.serviceId, cfg.clientTemplateId, data);

        push('cart_order_request_sent', {
          request_id: requestId,
          cart_total: formatEuro(total),
          cart_count: data.cart_count,
          payment_provider: 'sumup'
        });

        if (isSingle) {
          sessionStorage.removeItem('bendago_last_cart_request');
          sessionStorage.setItem('bendago_last_request', JSON.stringify({
            product_name: first.product_name,
            price: first.price,
            customer_name: formData.customer_name,
            email: formData.email,
            color_option: formData.color_option || 'To confirm / not applicable',
            request_id: requestId,
            sumup_url: first.sumup_url
          }));
        } else {
          sessionStorage.removeItem('bendago_last_request');
          sessionStorage.setItem('bendago_last_cart_request', JSON.stringify({
            cart_summary: cartSummary.replace(/\n/g, '<br>'),
            cart_total: formatEuro(total),
            email: formData.email,
            request_id: requestId
          }));
        }

        saveCart([]);
        window.location.href = './thank-you.html?request_id=' + encodeURIComponent(requestId);
      } catch (err) {
        console.error(err);
        showStatus('err', 'The cart order request could not be sent. Check EmailJS keys/templates, then try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send my order request';
      }
    });
  });
})();
