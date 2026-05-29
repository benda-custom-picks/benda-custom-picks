/* BENDAGO CART FLOW V1 — scoped cart/order request logic */
(function () {
  const CART_KEY = 'bendago_cart_v1';
  const PRODUCTS = () => window.BENDAGO_PRODUCTS || {};

  function pushEvent(eventName, params = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  }

  function parsePrice(priceLabel) {
    const raw = String(priceLabel || '').replace(/\s/g, '').replace(',', '.');
    const match = raw.match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function formatEuro(amount) {
    return Math.round(amount) + ' € TTC';
  }

  function readCart() {
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(cart) ? cart.filter(item => item && item.code && item.qty > 0) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('bendago-cart-updated'));
  }

  function getProduct(code) {
    const product = PRODUCTS()[code];
    if (!product) return null;
    return {
      code: product.product_code || code,
      name: product.product_name || code,
      priceLabel: product.price || '0 € TTC',
      priceValue: parsePrice(product.price),
      image: product.image || './standby-product-visual.png',
      url: './order-' + code + '.html',
      fitment: product.fitment || 'Benda Napoleon 125/250'
    };
  }

  function codeFromUrl(url) {
    const match = String(url || '').match(/order-([^./?#]+)\.html/);
    return match ? match[1] : '';
  }

  function cartTotal(cart) {
    return cart.reduce((sum, item) => {
      const product = getProduct(item.code);
      return sum + (product ? product.priceValue * item.qty : 0);
    }, 0);
  }

  function cartCount(cart) {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function addToCart(code) {
    const product = getProduct(code);
    if (!product) return;
    const cart = readCart();
    const existing = cart.find(item => item.code === code);
    if (existing) existing.qty += 1;
    else cart.push({ code, qty: 1 });
    saveCart(cart);
    pushEvent('bendago_cart_add', {
      product_code: product.code,
      product_name: product.name,
      product_price: product.priceValue
    });
  }

  function updateQty(code, delta) {
    const cart = readCart().map(item => item.code === code ? { ...item, qty: item.qty + delta } : item)
      .filter(item => item.qty > 0);
    saveCart(cart);
  }

  function removeItem(code) {
    saveCart(readCart().filter(item => item.code !== code));
  }

  function clearCart() {
    saveCart([]);
  }

  function itemSummaryLines(cart) {
    return cart.map(item => {
      const product = getProduct(item.code);
      if (!product) return '';
      return '- ' + product.name + ' x' + item.qty + ' — ' + formatEuro(product.priceValue * item.qty);
    }).filter(Boolean);
  }

  function renderDrawer() {
    const cart = readCart();
    const body = document.querySelector('[data-cart-body]');
    const countEls = document.querySelectorAll('[data-cart-count]');
    const totalEls = document.querySelectorAll('[data-cart-total]');
    const checkoutBtn = document.querySelector('[data-cart-checkout]');

    countEls.forEach(el => { el.textContent = String(cartCount(cart)); });
    totalEls.forEach(el => { el.textContent = formatEuro(cartTotal(cart)); });

    if (checkoutBtn) {
      checkoutBtn.classList.toggle('disabled', cart.length === 0);
    }

    if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty">Votre panier est vide. Ajoutez plusieurs pièces pour créer un look complet et recevoir un seul lien SumUp global après validation.</div>';
      return;
    }

    body.innerHTML = cart.map(item => {
      const product = getProduct(item.code);
      if (!product) return '';
      return '<div class="cart-line" data-code="' + product.code + '">' +
        '<img alt="" src="' + product.image + '">' +
        '<div>' +
          '<div class="cart-line-title">' + product.name + '</div>' +
          '<div class="cart-line-price">' + product.priceLabel + ' / unit</div>' +
          '<div class="cart-line-actions">' +
            '<button class="cart-qty-btn" type="button" data-cart-minus="' + product.code + '">−</button>' +
            '<strong>x' + item.qty + '</strong>' +
            '<button class="cart-qty-btn" type="button" data-cart-plus="' + product.code + '">+</button>' +
            '<button class="cart-remove-btn" type="button" data-cart-remove="' + product.code + '">Remove</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function openCart() {
    document.querySelector('.cart-overlay')?.classList.add('active');
    document.querySelector('.cart-drawer')?.classList.add('active');
    pushEvent('bendago_cart_open', { cart_count: cartCount(readCart()) });
  }

  function closeCart() {
    document.querySelector('.cart-overlay')?.classList.remove('active');
    document.querySelector('.cart-drawer')?.classList.remove('active');
  }

  function installHomepageCart() {
    const grid = document.getElementById('grid');
    if (!grid) return;

    document.querySelectorAll('.featured-card').forEach(card => {
      const link = card.querySelector('a[href*="order-"]');
      const code = codeFromUrl(link ? link.getAttribute('href') : '');
      if (!code || !getProduct(code) || card.querySelector('.cart-add-btn')) return;
      const orderButton = card.querySelector('.order-btn') || card.querySelector('.btn');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cart-add-btn';
      button.setAttribute('data-cart-add', code);
      button.textContent = 'Ajouter au panier';
      if (orderButton && orderButton.parentNode) orderButton.insertAdjacentElement('afterend', button);
    });

    if (!document.querySelector('.cart-floating-btn')) {
      document.body.insertAdjacentHTML('beforeend',
        '<button class="cart-floating-btn" type="button" data-cart-open>🛒 Panier <span class="cart-count-badge" data-cart-count>0</span></button>' +
        '<div class="cart-overlay" data-cart-close></div>' +
        '<aside class="cart-drawer" aria-label="Bendago cart">' +
          '<div class="cart-head"><div><h2>Votre sélection custom</h2><p>Total automatique. Paiement unique SumUp envoyé après validation.</p></div><button class="cart-close" type="button" data-cart-close>×</button></div>' +
          '<div class="cart-body" data-cart-body></div>' +
          '<div class="cart-footer">' +
            '<div class="cart-total-row"><span>Total articles</span><span data-cart-total>0 € TTC</span></div>' +
            '<div class="cart-note">Ajoutez plusieurs pièces, envoyez votre demande une seule fois, puis recevez un lien SumUp unique du montant total après vérification.</div>' +
            '<a class="cart-checkout-btn" data-cart-checkout href="./cart-request.html">Finaliser ma commande</a>' +
            '<button class="cart-clear-btn" type="button" data-cart-clear>Vider le panier</button>' +
          '</div>' +
        '</aside>'
      );
    }

    renderDrawer();
  }

  function renderCartRequestPage() {
    const summary = document.getElementById('cartSummary');
    if (!summary) return;
    const cart = readCart();
    if (!cart.length) {
      summary.innerHTML = '<div class="cart-empty">Votre panier est vide. Retournez aux pièces Bendago pour ajouter votre sélection.</div>';
      const form = document.getElementById('cartRequestForm');
      if (form) form.style.display = 'none';
      return;
    }
    summary.innerHTML = '<h2>Votre panier Bendago</h2>' +
      cart.map(item => {
        const product = getProduct(item.code);
        if (!product) return '';
        return '<div class="cart-summary-row"><div><strong>' + product.name + '</strong><br><span>' + product.priceLabel + ' × ' + item.qty + '</span></div><div>' + formatEuro(product.priceValue * item.qty) + '</div></div>';
      }).join('') +
      '<div class="cart-summary-total"><span>Total articles</span><span>' + formatEuro(cartTotal(cart)) + '</span></div>';
  }

  function installCartRequestForm() {
    const form = document.getElementById('cartRequestForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = document.getElementById('cartFormStatus');
      const submitBtn = form.querySelector('[type="submit"]');
      const cfg = window.BENDAGO_EMAILJS_CONFIG || {};
      const cart = readCart();

      function showStatus(type, message) {
        if (!status) return;
        status.className = 'status-box show ' + type;
        status.textContent = message;
      }

      if (!cart.length) {
        showStatus('err', 'Votre panier est vide. Ajoutez au moins une pièce avant envoi.');
        return;
      }
      if (!cfg.publicKey || !cfg.serviceId || !cfg.adminTemplateId || !cfg.clientTemplateId) {
        showStatus('err', 'EmailJS is not configured yet.');
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      const requestId = 'BENDAGO-CART-' + Date.now();
      const total = cartTotal(cart);
      const lines = itemSummaryLines(cart);

      Object.assign(data, {
        request_id: requestId,
        request_date: new Date().toLocaleString(),
        customer_email: data.email,
        product_code: 'cart_multi_parts',
        product_name: 'Bendago multi-part cart order',
        product_short: 'Grouped Bendago cart request',
        price: formatEuro(total),
        fitment: data.motorcycle_model || 'Benda Napoleon 125/250',
        quantity: String(cartCount(cart)),
        delivery_estimate: 'To confirm after validation',
        request_page: window.location.href,
        referrer: document.referrer || 'direct',
        payment_provider: 'Manual SumUp link after validation',
        payment_url: 'Manual SumUp total link to be sent after validation',
        sumup_url: 'Manual SumUp total link to be sent after validation',
        color_option: data.color_option || 'To confirm / not applicable',
        cart_summary: lines.join('\n'),
        cart_total: formatEuro(total),
        cart_count: String(cartCount(cart)),
        order_status_message: 'Cart request received. A single SumUp payment link for the total will be sent after validation.',
        tracking_note: 'Tracking details will be shared as soon as supplier shipping details are available.',
        supplier_validation_note: 'Compatibility, availability and final supplier validation are checked before the grouped SumUp payment link is sent.'
      });

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending cart request…';
        showStatus('ok', 'Sending cart request…');
        if (window.emailjs && emailjs.init) emailjs.init({ publicKey: cfg.publicKey });
        await emailjs.send(cfg.serviceId, cfg.adminTemplateId, data);
        await emailjs.send(cfg.serviceId, cfg.clientTemplateId, data);
        pushEvent('bendago_cart_request_sent', {
          request_id: requestId,
          cart_count: cartCount(cart),
          cart_total: total
        });
        sessionStorage.setItem('bendago_last_cart_request', JSON.stringify({
          request_id: requestId,
          customer_name: data.customer_name,
          email: data.email,
          cart_summary: lines.join('<br>'),
          cart_total: formatEuro(total)
        }));
        clearCart();
        window.location.href = './thank-you.html?cart=1&request_id=' + encodeURIComponent(requestId);
      } catch (err) {
        console.error(err);
        showStatus('err', 'The cart request could not be sent. Check EmailJS settings, then try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma commande';
      }
    });
  }

  document.addEventListener('click', event => {
    const add = event.target.closest('[data-cart-add]');
    if (add) {
      addToCart(add.getAttribute('data-cart-add'));
      openCart();
      return;
    }
    if (event.target.closest('[data-cart-open]')) { openCart(); return; }
    if (event.target.closest('[data-cart-close]')) { closeCart(); return; }
    const plus = event.target.closest('[data-cart-plus]');
    if (plus) { updateQty(plus.getAttribute('data-cart-plus'), 1); return; }
    const minus = event.target.closest('[data-cart-minus]');
    if (minus) { updateQty(minus.getAttribute('data-cart-minus'), -1); return; }
    const remove = event.target.closest('[data-cart-remove]');
    if (remove) { removeItem(remove.getAttribute('data-cart-remove')); return; }
    if (event.target.closest('[data-cart-clear]')) { clearCart(); return; }
    if (event.target.closest('[data-cart-checkout]')) {
      if (!readCart().length) event.preventDefault();
      else pushEvent('bendago_cart_checkout_click', { cart_count: cartCount(readCart()), cart_total: cartTotal(readCart()) });
    }
  });

  window.addEventListener('bendago-cart-updated', renderDrawer);
  document.addEventListener('DOMContentLoaded', () => {
    installHomepageCart();
    renderCartRequestPage();
    installCartRequestForm();
  });
})();
