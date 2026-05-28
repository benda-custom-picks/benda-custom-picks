// BENDAGO anti-copy friction layer.
// It reduces casual right-click / drag / long-press copying.
// It cannot prevent screenshots, browser devtools, or server-side scraping.
(function () {
  const protectedSelector = [
    'img',
    '.featured-thumb',
    '.featured-card',
    '.product-layout',
    '.media-card',
    '.build-card'
  ].join(',');

  document.addEventListener('contextmenu', function (event) {
    if (event.target.closest(protectedSelector)) {
      event.preventDefault();
    }
  }, { capture: true });

  document.addEventListener('dragstart', function (event) {
    if (event.target.closest(protectedSelector)) {
      event.preventDefault();
    }
  }, { capture: true });

  document.addEventListener('copy', function (event) {
    if (window.getSelection && String(window.getSelection()).length > 0) {
      const anchor = window.getSelection().anchorNode;
      const element = anchor && (anchor.nodeType === 1 ? anchor : anchor.parentElement);
      if (element && element.closest && element.closest('.featured-card, .build-card, .product-layout')) {
        event.preventDefault();
      }
    }
  }, { capture: true });

  document.querySelectorAll('img').forEach(function (img) {
    img.setAttribute('draggable', 'false');
    img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
  });
})();
