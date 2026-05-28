// BENDAGO V23.25 — front + product anti-copy hardening.
// Friction only: screenshots/devtools cannot be fully blocked on a public website.
(function () {
  const blockAllContextMenus = true;

  function block(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    return false;
  }

  // Block right click / long-press context menu everywhere on the site.
  document.addEventListener('contextmenu', function (event) {
    if (blockAllContextMenus) return block(event);
  }, true);

  // Block image drag, selection and casual copy.
  ['dragstart', 'selectstart'].forEach(function (type) {
    document.addEventListener(type, function (event) {
      const target = event.target;
      if (
        target &&
        target.closest &&
        target.closest('img, .hero, .hero-card, .hero-grid, .hero-visual, .featured-card, .featured-media, .featured-thumb, .build-card, .media-card, .product-layout, .main-product-img, .thumb-row, .product-thumb')
      ) {
        return block(event);
      }
    }, true);
  });

  document.addEventListener('copy', function (event) {
    const target = event.target;
    if (
      target &&
      target.closest &&
      target.closest('.hero, .featured-card, .build-card, .media-card, .product-layout, .info-card')
    ) {
      return block(event);
    }
  }, true);

  // Disable dragging and browser image context behavior.
  function protectImages() {
    document.querySelectorAll('img').forEach(function (img) {
      img.setAttribute('draggable', 'false');
      img.setAttribute('oncontextmenu', 'return false;');
      img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
      img.style.webkitUserDrag = 'none';
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      img.style.webkitTouchCallout = 'none';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectImages);
  } else {
    protectImages();
  }

  // Block casual save/print/source shortcuts.
  document.addEventListener('keydown', function (event) {
    const key = String(event.key || '').toLowerCase();
    if ((event.ctrlKey || event.metaKey) && ['s', 'p', 'u', 'c'].includes(key)) {
      const active = document.activeElement;
      const editable = active && (
        active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable
      );
      if (!editable) return block(event);
    }
  }, true);
})();
