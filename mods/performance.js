/**
 * TFlix Performance Optimizer
 * This module implements performance optimizations for smoother operation on Tizen TVs
 */

/**
 * Initialize performance optimizations
 */
function initializePerformanceOptimizations() {
  // Apply optimizations once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyOptimizations);
  } else {
    applyOptimizations();
  }
}

/**
 * Apply various performance optimizations
 */
function applyOptimizations() {
  // Optimize images and lazy loading
  optimizeImages();

  // Reduce animation complexity
  reduceAnimations();

  // Optimize scrolling performance
  optimizeScrolling();

  // Debounce event handlers
  setupEventDebouncing();

  // Memory management
  setupMemoryManagement();
}

/**
 * Optimize images with lazy loading and size optimizations
 */
function optimizeImages() {
  // Find all images that don't have loading attribute
  var images = document.querySelectorAll('img:not([loading])');

  for (var i = 0; i < images.length; i++) {
    var img = images[i];

    // Add lazy loading
    img.setAttribute('loading', 'lazy');

    // Add decoding async for better performance (if supported)
    if ('decoding' in img) {
      img.setAttribute('decoding', 'async');
    }

    // Set explicit width/height if missing to avoid layout shifts
    if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
      var computedStyle = window.getComputedStyle(img);
      var width = computedStyle.width;
      var height = computedStyle.height;

      if (width && width !== 'auto' && height && height !== 'auto') {
        img.setAttribute('width', parseInt(width, 10));
        img.setAttribute('height', parseInt(height, 10));
      }
    }
  }

  // Set up intersection observer for better lazy loading (if supported)
  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      for (var j = 0; j < entries.length; j++) {
        var entry = entries[j];
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }
          observer.unobserve(img);
        }
      }
    });

    var lazyImages = document.querySelectorAll('img[data-src]');
    for (var k = 0; k < lazyImages.length; k++) {
      imageObserver.observe(lazyImages[k]);
    }
  }
}

/**
 * Reduce animation complexity for better performance
 */
function reduceAnimations() {
  // Create a style element to inject optimized animation rules
  var style = document.createElement('style');
  style.textContent = '\
    /* Reduce CSS animation complexity for performance */\
    * {\
      animation-duration: 0.15s !important;\
      transition-duration: 0.15s !important;\
    }\
    \
    /* Keep essential animations with reasonable duration */\
    .tflix-focused {\
      animation-duration: 0.2s !important;\
      transition-duration: 0.2s !important;\
    }\
    \
    /* Reduce motion for users who prefer it */\
    @media (prefers-reduced-motion: reduce) {\
      * {\
        animation: none !important;\
        transition: none !important;\
      }\
    }\
  ';

  document.head.appendChild(style);
}

/**
 * Optimize scrolling performance
 */
function optimizeScrolling() {
  // Disable smooth scrolling which can be performance heavy
  var scrollableElements = document.querySelectorAll('div, main, section');

  for (var i = 0; i < scrollableElements.length; i++) {
    var el = scrollableElements[i];
    var style = window.getComputedStyle(el);
    var overflow = style.getPropertyValue('overflow');
    var overflowY = style.getPropertyValue('overflow-y');

    if (overflow === 'auto' || overflow === 'scroll' ||
        overflowY === 'auto' || overflowY === 'scroll') {
      // Add will-change for better rendering performance (if supported)
      if ('style' in el) {
        el.style.willChange = 'transform';

        // Use translate3d for hardware acceleration
        el.style.transform = 'translate3d(0,0,0)';
      }
    }
  }
}

/**
 * Set up event debouncing for better performance
 */
function setupEventDebouncing() {
  // Debounce scroll and resize events
  var scrollTimeout;
  var resizeTimeout;

  var originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'scroll') {
      var debouncedListener = function(e) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
          listener.call(this, e);
        }.bind(this), 100);
      };

      return originalAddEventListener.call(this, type, debouncedListener, options);
    } else if (type === 'resize') {
      var debouncedResizeListener = function(e) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          listener.call(this, e);
        }.bind(this), 100);
      };

      return originalAddEventListener.call(this, type, debouncedResizeListener, options);
    }

    return originalAddEventListener.call(this, type, listener, options);
  };
}

/**
 * Set up memory management to prevent memory leaks
 */
function setupMemoryManagement() {
  // Note: Removed aggressive memory clearing as it may cause performance issues
  // on older Tizen devices. Modern browsers handle garbage collection automatically.

  // Instead, just clear any large objects we create
  var MAX_CACHE_SIZE = 50;
  var elementCache = [];

  window.TFLIX_CACHE = {
    get: function(key) {
      for (var i = 0; i < elementCache.length; i++) {
        if (elementCache[i].key === key) {
          return elementCache[i].value;
        }
      }
      return null;
    },
    set: function(key, value) {
      // Check if key already exists
      for (var i = 0; i < elementCache.length; i++) {
        if (elementCache[i].key === key) {
          elementCache[i].value = value;
          return;
        }
      }
      // Add new entry
      elementCache.push({ key: key, value: value });

      // Remove oldest if cache is too large
      if (elementCache.length > MAX_CACHE_SIZE) {
        elementCache.shift();
      }
    },
    clear: function() {
      elementCache = [];
    }
  };
}

// Export the initialization function
export {
  initializePerformanceOptimizations
};
