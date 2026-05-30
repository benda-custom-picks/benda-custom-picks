/* BENDAGO CART FLOW V1.2 — visible cart restored, multi-part cart preserved */
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
    window.dispatchEvent(new CustomEvent('bendago:cart-updated'));
  }

  function euroToNumber(value) {
    const match = String(value || '').replace(',', '.').match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? Number(match[1]) : 0;
  }

  function formatEuro(value) {
    return Math.round(value) + ' € TTC';
  }

  function cleanOption(value) {
    return String(value || '').trim();
  }

  function optionLabel(item) {
    return cleanOption(item && item.color_option);
  }

  function optionText(item) {
    const color = optionLabel(item);
    return color ? 'Colour: ' + color : '';
  }

  function products() {
    return window.BENDAGO_PRODUCTS || {};
  }

  function getLines() {
    const map = products();
    return readCart().map(item => {
      const product = map[item.code];
      if (!product) return null;
      const qty = Math.max(1, Number(item.qty) || 1);
      const unit = euroToNumber(product.price);
      return { ...product, code: item.code, qty, color_option: optionLabel(item), line_total: unit * qty };
    }).filter(Boolean);
  }

  function cartCount() {
    return readCart().reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  }

  function itemKey(item) {
    return String(item.code || '') + '::' + optionLabel(item);
  }

  function setQty(key, qty) {
    const next = readCart().map(item => itemKey(item) === key ? { ...item, qty: Number(qty) } : item)
      .filter(item => item.qty > 0);
    saveCart(next);
  }

  function removeItem(key) {
    saveCart(readCart().filter(item => itemKey(item) !== key));
  }

  function clearCart() {
    saveCart([]);
  }

  function addToCart(code, qty = 1, options = {}) {
    const map = products();
    if (!code || !map[code]) return false;
    const colorOption = cleanOption(options.color_option);
    const cart = readCart();
    const existing = cart.find(item => item.code === code && optionLabel(item) === colorOption);
    if (existing) existing.qty += qty;
    else cart.push({ code, qty, color_option: colorOption });
    saveCart(cart);
    push('add_to_cart', {
      product_code: code,
      product_name: map[code].product_name,
      price: map[code].price,
      color_option: colorOption,
      cart_count: cartCount()
    });
    return true;
  }

  function ensureCartUi() {
    if (document.getElementById('bendagoCartButton')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'bendagoCartButton';
    btn.className = 'cart-floating-btn';
    btn.innerHTML = 'Cart <span class="cart-count-badge" data-cart-count>0</span>';
    btn.setAttribute('aria-label', 'Open cart');

    const overlay = document.createElement('div');
    overlay.id = 'bendagoCartOverlay';
    overlay.className = 'cart-overlay';

    const drawer = document.createElement('aside');
    drawer.id = 'bendagoCartDrawer';
    drawer.className = 'cart-drawer';
    drawer.setAttribute('aria-label', 'Benda Custom Picks cart');
    drawer.innerHTML = [
      '<div class="cart-head">',
      '<div><h2>Your cart</h2><p>Select one or several Benda Napoleon parts.</p></div>',
      '<button type="button" class="cart-close" data-cart-close aria-label="Close cart">×</button>',
      '</div>',
      '<div class="cart-body" data-cart-body></div>',
      '<div class="cart-footer">',
      '<div class="cart-total-row"><span>Total</span><strong data-cart-total>0 € TTC</strong></div>',
      '<div class="cart-note"><strong>Ready to checkout.</strong><br>1 item: secure card payment. Several parts: grouped checkout total. Delivery after payment: 10–15 days.</div>',
      '<a class="cart-checkout-btn disabled" data-cart-checkout href="./cart-request.html">Continue to secure checkout</a>',
      '<button type="button" class="cart-clear-btn" data-cart-clear>Clear cart</button>',
      '</div>'
    ].join('');

    document.body.appendChild(btn);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    btn.addEventListener('click', openCart);
    overlay.addEventListener('click', closeCart);
    drawer.querySelector('[data-cart-close]').addEventListener('click', closeCart);
    drawer.querySelector('[data-cart-clear]').addEventListener('click', () => {
      clearCart();
      renderCartDrawer();
    });

    drawer.querySelector('[data-cart-checkout]').addEventListener('click', () => {
      push('cart_checkout_click', { cart_count: cartCount() });
    });

    drawer.addEventListener('click', (event) => {
      const dec = event.target.closest('[data-cart-dec]');
      const inc = event.target.closest('[data-cart-inc]');
      const rem = event.target.closest('[data-cart-remove]');
      if (dec) {
        const key = dec.getAttribute('data-cart-dec');
        const item = readCart().find(x => itemKey(x) === key);
        if (item) setQty(key, (Number(item.qty) || 1) - 1);
      }
      if (inc) {
        const key = inc.getAttribute('data-cart-inc');
        const item = readCart().find(x => itemKey(x) === key);
        if (item) setQty(key, (Number(item.qty) || 1) + 1);
      }
      if (rem) removeItem(rem.getAttribute('data-cart-remove'));
      if (dec || inc || rem) renderCartDrawer();
    });

    renderCartDrawer();
  }

  function openCart() {
    ensureCartUi();
    renderCartDrawer();
    document.getElementById('bendagoCartOverlay')?.classList.add('active');
    document.getElementById('bendagoCartDrawer')?.classList.add('active');
  }

  function closeCart() {
    document.getElementById('bendagoCartOverlay')?.classList.remove('active');
    document.getElementById('bendagoCartDrawer')?.classList.remove('active');
  }

  function renderCartDrawer() {
    const lines = getLines();
    const countEls = document.querySelectorAll('[data-cart-count]');
    countEls.forEach(el => { el.textContent = String(cartCount()); });
    const body = document.querySelector('[data-cart-body]');
    const totalEl = document.querySelector('[data-cart-total]');
    const checkout = document.querySelector('[data-cart-checkout]');
    if (!body || !totalEl || !checkout) return;

    if (!lines.length) {
      body.innerHTML = '<div class="cart-empty">Your cart is empty. Open a product page and add one or several parts.</div>';
      totalEl.textContent = '0 € TTC';
      checkout.classList.add('disabled');
      return;
    }

    const total = lines.reduce((sum, line) => sum + line.line_total, 0);
    body.innerHTML = lines.map(line => [
      '<div class="cart-line">',
      '<img src="' + (line.image || './standby-product-visual.png') + '" alt="' + escapeHtml(line.product_name) + '">',
      '<div>',
      '<div class="cart-line-title">' + escapeHtml(line.product_name) + '</div>',
      optionText(line) ? '<div class="cart-line-option">' + escapeHtml(optionText(line)) + '</div>' : '',
      '<div class="cart-line-price">' + escapeHtml(line.price) + '</div>',
      '<div class="cart-line-actions">',
      '<button class="cart-qty-btn" type="button" data-cart-dec="' + escapeHtml(itemKey(line)) + '">−</button>',
      '<strong>' + line.qty + '</strong>',
      '<button class="cart-qty-btn" type="button" data-cart-inc="' + escapeHtml(itemKey(line)) + '">+</button>',
      '<button class="cart-remove-btn" type="button" data-cart-remove="' + escapeHtml(itemKey(line)) + '">Remove</button>',
      '</div>',
      '</div>',
      '</div>'
    ].join('')).join('');
    totalEl.textContent = formatEuro(total);
    checkout.classList.remove('disabled');
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
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
      '<div class="cart-summary-row"><span>' + escapeHtml(line.product_name) + ' × ' + line.qty + (optionText(line) ? ' — ' + escapeHtml(optionText(line)) : '') + '</span><strong>' + formatEuro(line.line_total) + '</strong></div>'
    ).join('') + '<div class="cart-summary-total"><span>Total</span><strong>' + formatEuro(total) + '</strong></div>';
  }

  function bindCartForm() {
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
      const cartSummary = lines.map(line => line.product_name + ' x ' + line.qty + (optionText(line) ? ' — ' + optionText(line) : '') + ' — ' + formatEuro(line.line_total)).join('\n');
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
        order_status_message: isSingle ? 'Checkout details received. Continue to secure SumUp card payment.' : 'Cart checkout details received. One grouped secure payment checkout follows for the cart total.',
        color_option: isSingle ? (first.color_option || formData.color_option || 'To confirm / not applicable') : (formData.color_option || 'See cart summary'),
        tracking_note: 'Tracking details are shared as soon as they are available after shipment.',
        processing_note: 'Order processed after secure SumUp payment confirmation.'
      };

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Continuing checkout…';
        }
        showStatus('ok', 'Preparing secure checkout…');

        if (window.emailjs && emailjs.init) emailjs.init({ publicKey: cfg.publicKey });
        await emailjs.send(cfg.serviceId, cfg.adminTemplateId, data);
        await emailjs.send(cfg.serviceId, cfg.clientTemplateId, data);

        push('cart_checkout_details_sent', {
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
            color_option: first.color_option || formData.color_option || 'To confirm / not applicable',
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
        showStatus('err', 'Checkout details could not be sent. Check EmailJS keys/templates, then try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Continue checkout';
        }
      }
    });
  }

  window.BendagoCart = {
    read: readCart,
    add: addToCart,
    open: openCart,
    render: renderCartDrawer,
    clear: clearCart
  };

  document.addEventListener('DOMContentLoaded', () => {
    ensureCartUi();
    bindCartForm();
  });
  window.addEventListener('bendago:cart-updated', renderCartDrawer);
})();
