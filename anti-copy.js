// BENDAGO V23.24 — product page anti-copy hardening.
// Friction only: screenshots/devtools cannot be fully blocked on a public website.
(function () {
  const protectedSelector = [
    'img',
    '.media-card',
    '.main-product-img',
    '.thumb-row',
    '.product-thumb',
    '.featured-card',
    '.product-layout',
    '.info-card',
    '.preview-placeholder'
  ].join(',');

  function isProtectedTarget(target) {
    return target && target.closest && target.closest(protectedSelector);
  }

  function block(event) {
    if (isProtectedTarget(event.target)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }

  ['contextmenu', 'dragstart', 'selectstart'].forEach(function (type) {
    document.addEventListener(type, block, true);
    document.addEventListener(type, block, false);
  });

  document.addEventListener('copy', function (event) {
    if (isProtectedTarget(event.target)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);

  document.addEventListener('touchstart', function (event) {
    if (isProtectedTarget(event.target)) {
      document.body.classList.add('bendago-touch-protected');
    }
  }, { capture: true, passive: true });

  document.addEventListener('touchend', function () {
    document.body.classList.remove('bendago-touch-protected');
  }, { capture: true, passive: true });

  document.querySelectorAll('img').forEach(function (img) {
    img.setAttribute('draggable', 'false');
    img.setAttribute('oncontextmenu', 'return false;');
    img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
  });

  // Extra: block common shortcuts while the user is over product media.
  let overProtected = false;
  document.addEventListener('mouseover', function (event) {
    overProtected = !!isProtectedTarget(event.target);
  }, true);
  document.addEventListener('mouseout', function () {
    overProtected = false;
  }, true);

  document.addEventListener('keydown', function (event) {
    if (!overProtected) return;
    const key = String(event.key || '').toLowerCase();
    if ((event.ctrlKey || event.metaKey) && ['s', 'p', 'u', 'c'].includes(key)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
})();
