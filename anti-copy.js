/* BENDAGO v17 — anti-copy + gallery cleanup hotfix
   Purpose:
   - keep normal anti-copy friction
   - remove cross-product gallery photos from:
     1) Black striped clutch cover page
     2) Gold clutch flywheel page
   Safe scope: only runs cleanup when the page title/H1/URL matches these products.
*/
(function () {
  function norm(s) {
    return String(s || '').toLowerCase();
  }

  function pageKey() {
    var haystack = norm([
      window.location.pathname,
      document.title,
      document.querySelector('h1') ? document.querySelector('h1').textContent : ''
    ].join(' '));

    if (
      haystack.includes('black striped clutch') ||
      haystack.includes('black ribbed clutch') ||
      haystack.includes('order-black-striped-clutch-cover')
    ) return 'black_clutch';

    if (
      haystack.includes('gold clutch') ||
      haystack.includes('gold flywheel') ||
      haystack.includes('order-gold-clutch-flywheel')
    ) return 'gold_clutch';

    return '';
  }

  function closestThumb(node) {
    if (!node) return null;
    return node.closest('.product-thumb, .thumb, .gallery button, .gallery a, .gallery-item, li, button, a');
  }

  function imageInfo(img) {
    return norm([
      img.getAttribute('src'),
      img.getAttribute('data-src'),
      img.getAttribute('alt'),
      img.getAttribute('title'),
      img.parentElement ? img.parentElement.getAttribute('data-img') : '',
      img.parentElement ? img.parentElement.getAttribute('aria-label') : ''
    ].join(' '));
  }

  function shouldRemove(info, key) {
    if (key === 'black_clutch') {
      return (
        info.includes('gold-clutch') ||
        info.includes('gold clutch') ||
        info.includes('gold-flywheel') ||
        info.includes('gold flywheel') ||
        info.includes('flywheel') ||
        info.includes('gold-inner') ||
        info.includes('gold inner')
      );
    }

    if (key === 'gold_clutch') {
      return (
        info.includes('black-striped-clutch') ||
        info.includes('black striped clutch') ||
        info.includes('black-ribbed-clutch') ||
        info.includes('black ribbed clutch') ||
        info.includes('ribbed-clutch') ||
        info.includes('ribbed clutch') ||
        info.includes('striped-clutch') ||
        info.includes('striped clutch')
      );
    }

    return false;
  }

  function setMainToFirstValid() {
    var main =
      document.querySelector('.main-product-img') ||
      document.querySelector('#mainProductImage') ||
      document.querySelector('.product-main img') ||
      document.querySelector('.media-card > img');

    var first =
      document.querySelector('.product-thumb img') ||
      document.querySelector('.thumb img') ||
      document.querySelector('.gallery button img') ||
      document.querySelector('.gallery a img');

    if (main && first && first.getAttribute('src')) {
      main.setAttribute('src', first.getAttribute('src'));
      if (first.getAttribute('alt')) main.setAttribute('alt', first.getAttribute('alt'));
    }

    var active = document.querySelector('.product-thumb.active, .thumb.active');
    if (!active) {
      var firstThumb = document.querySelector('.product-thumb, .thumb, .gallery button, .gallery a');
      if (firstThumb && firstThumb.classList) firstThumb.classList.add('active');
    }
  }

  function cleanupCrossProductGallery() {
    var key = pageKey();
    if (!key) return;

    var removed = 0;
    var imgs = Array.prototype.slice.call(document.querySelectorAll('.gallery img, .product-thumb img, .thumb img'));

    imgs.forEach(function (img) {
      var info = imageInfo(img);
      if (!shouldRemove(info, key)) return;

      var thumb = closestThumb(img);
      if (thumb) {
        thumb.remove();
        removed += 1;
      } else {
        img.remove();
        removed += 1;
      }
    });

    var main =
      document.querySelector('.main-product-img') ||
      document.querySelector('#mainProductImage') ||
      document.querySelector('.product-main img') ||
      document.querySelector('.media-card > img');

    if (main && shouldRemove(imageInfo(main), key)) {
      setMainToFirstValid();
    }

    if (removed > 0) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'bendago_gallery_cleanup',
        product_page: key,
        removed_count: removed
      });
    }
  }

  function applyAntiCopyFriction() {
    document.querySelectorAll('img, .featured-thumb, .featured-media, .main-product-img, .product-thumb img, .build-card img').forEach(function (el) {
      el.setAttribute('draggable', 'false');
      el.style.webkitUserDrag = 'none';
      el.style.userDrag = 'none';
      el.style.webkitTouchCallout = 'none';
    });

    document.addEventListener('dragstart', function (event) {
      if (event.target && event.target.closest && event.target.closest('img, .featured-thumb, .main-product-img, .product-thumb img')) {
        event.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('contextmenu', function (event) {
      if (event.target && event.target.closest && event.target.closest('img, .featured-thumb, .main-product-img, .product-thumb img, .media-card')) {
        event.preventDefault();
      }
    }, { passive: false });
  }

  function run() {
    applyAntiCopyFriction();
    cleanupCrossProductGallery();
    setTimeout(cleanupCrossProductGallery, 250);
    setTimeout(cleanupCrossProductGallery, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
