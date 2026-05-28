/* BENDAGO v17 — anti-copy + clutch gallery fixes + gold clutch gallery add
   Purpose:
   - keep normal anti-copy friction
   - remove cross-product gallery photos from black/gold clutch pages
   - add the new beautified product photo to Gold Clutch Inner Accent gallery
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
      haystack.includes('gold clutch inner accent') ||
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

  function mainImage() {
    return document.querySelector('.main-product-img') ||
      document.querySelector('#mainProductImage') ||
      document.querySelector('.product-main img') ||
      document.querySelector('.media-card > img');
  }

  function thumbElements() {
    return Array.prototype.slice.call(document.querySelectorAll('.product-thumb, .thumb, .gallery button, .gallery a'));
  }

  function setMainToFirstValid() {
    var main = mainImage();
    var firstImg = document.querySelector('.product-thumb img, .thumb img, .gallery button img, .gallery a img');

    if (main && firstImg && firstImg.getAttribute('src')) {
      main.setAttribute('src', firstImg.getAttribute('src'));
      if (firstImg.getAttribute('alt')) main.setAttribute('alt', firstImg.getAttribute('alt'));
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

    var main = mainImage();
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

  function findGalleryContainer() {
    var firstThumb = document.querySelector('.product-thumb, .thumb, .gallery button, .gallery a');
    if (firstThumb && firstThumb.parentElement) return firstThumb.parentElement;
    return document.querySelector('.gallery');
  }

  function activateThumb(thumb) {
    var main = mainImage();
    var src = thumb.getAttribute('data-img') || thumb.getAttribute('href');
    var alt = thumb.getAttribute('aria-label') || 'Gold Clutch Inner Accent studio product photo';
    if (main && src) {
      main.setAttribute('src', src);
      main.setAttribute('alt', alt);
    }
    thumbElements().forEach(function (t) { if (t.classList) t.classList.remove('active'); });
    if (thumb.classList) thumb.classList.add('active');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'product_gallery_click',
      product_page: 'gold_clutch',
      image_src: src
    });
  }

  function bindThumb(thumb) {
    if (!thumb || thumb.getAttribute('data-bendago-bound') === '1') return;
    thumb.setAttribute('data-bendago-bound', '1');
    thumb.addEventListener('click', function (e) {
      if (thumb.tagName.toLowerCase() === 'a') e.preventDefault();
      activateThumb(thumb);
    });
  }

  function addGoldClutchGalleryImage() {
    if (pageKey() !== 'gold_clutch') return;
    var gallery = findGalleryContainer();
    if (!gallery) return;

    if (document.querySelector('[data-bendago-gallery-add="gold-clutch-05"]')) return;

    var existingSample = document.querySelector('.product-thumb, .thumb, .gallery button, .gallery a');
    var thumb;

    if (existingSample) {
      thumb = existingSample.cloneNode(true);
      thumb.classList.remove('active');
      thumb.setAttribute('data-bendago-gallery-add', 'gold-clutch-05');
      thumb.setAttribute('data-img', './gold-clutch-inner-accent-gallery-05.webp');
      thumb.setAttribute('aria-label', 'Gold Clutch Inner Accent studio product photo');
      if (thumb.tagName.toLowerCase() === 'a') thumb.setAttribute('href', './gold-clutch-inner-accent-gallery-05.webp');
      var img = thumb.querySelector('img');
      if (img) {
        img.setAttribute('src', './gold-clutch-inner-accent-gallery-05.webp');
        img.setAttribute('alt', 'Gold Clutch Inner Accent studio product photo');
        img.setAttribute('loading', 'lazy');
      } else {
        img = document.createElement('img');
        img.setAttribute('src', './gold-clutch-inner-accent-gallery-05.webp');
        img.setAttribute('alt', 'Gold Clutch Inner Accent studio product photo');
        img.setAttribute('loading', 'lazy');
        thumb.appendChild(img);
      }
    } else {
      thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'product-thumb';
      thumb.setAttribute('data-bendago-gallery-add', 'gold-clutch-05');
      thumb.setAttribute('data-img', './gold-clutch-inner-accent-gallery-05.webp');
      thumb.setAttribute('aria-label', 'Gold Clutch Inner Accent studio product photo');
      var img2 = document.createElement('img');
      img2.setAttribute('src', './gold-clutch-inner-accent-gallery-05.webp');
      img2.setAttribute('alt', 'Gold Clutch Inner Accent studio product photo');
      img2.setAttribute('loading', 'lazy');
      thumb.appendChild(img2);
    }

    bindThumb(thumb);
    gallery.appendChild(thumb);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'bendago_gallery_add',
      product_page: 'gold_clutch',
      image_src: './gold-clutch-inner-accent-gallery-05.webp'
    });
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

  function bindExistingThumbs() {
    thumbElements().forEach(bindThumb);
  }

  function run() {
    applyAntiCopyFriction();
    cleanupCrossProductGallery();
    bindExistingThumbs();
    addGoldClutchGalleryImage();
    setTimeout(function(){ cleanupCrossProductGallery(); bindExistingThumbs(); addGoldClutchGalleryImage(); }, 250);
    setTimeout(function(){ cleanupCrossProductGallery(); bindExistingThumbs(); addGoldClutchGalleryImage(); }, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
