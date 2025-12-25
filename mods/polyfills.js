/**
 * TFlix ES5 Polyfills
 * Provides polyfills for modern JavaScript features not available in Tizen TV 3.0 browsers
 */

// Array.forEach polyfill (IE8+)
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this === null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

// Array.indexOf polyfill (IE8+)
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this === null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

// Array.map polyfill (IE8+)
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this === null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

// Array.filter polyfill (IE8+)
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError('fun is not a function');
    }
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : null;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}

// Array.find polyfill (ES6)
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

// Array.isArray polyfill (IE8+)
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// Function.prototype.bind polyfill (IE8+)
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var fNOP = function() {};
    var fBound = function() {
      return fToBind.apply(
        this instanceof fNOP ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };
    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;
  };
}

// String.prototype.includes polyfill (ES6)
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// String.prototype.trim polyfill (IE8+)
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

// Object.keys polyfill (IE8+)
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    var dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
      var result = [];
      var prop, i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

// Object.values polyfill (ES6)
if (!Object.values) {
  Object.values = function(obj) {
    var vals = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        vals.push(obj[key]);
      }
    }
    return vals;
  };
}

// Performance.now polyfill
if (!window.performance) {
  window.performance = {};
}
if (!window.performance.now) {
  var nowOffset = Date.now();
  if (window.performance.timing && window.performance.timing.navigationStart) {
    nowOffset = window.performance.timing.navigationStart;
  }
  window.performance.now = function() {
    return Date.now() - nowOffset;
  };
}

// requestAnimationFrame polyfill
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

// CustomEvent polyfill (IE8+)
if (typeof window.CustomEvent !== 'function') {
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  window.CustomEvent = CustomEvent;
}

// ClassList polyfill for older browsers (IE9)
if ('classList' in document.documentElement) {
  // ClassList is already supported
} else {
  (function(view) {
    'use strict';
    if (!('Element' in view)) {
      return;
    }

    var classListProp = 'classList';
    var protoProp = 'prototype';
    var elemCtrProto = view.Element[protoProp];
    var objCtr = Object;

    var strTrim = String[protoProp].trim || function() {
      return this.replace(/^\s+|\s+$/g, '');
    };

    var arrIndexOf = Array[protoProp].indexOf || function(item) {
      var i = 0;
      var len = this.length;
      for (; i < len; i++) {
        if (i in this && this[i] === item) {
          return i;
        }
      }
      return -1;
    };

    var DOMTokenList = function(el) {
      this.el = el;
      var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
      for (var i = 0, len = classes.length; i < len; i++) {
        if (classes[i]) {
          this.push(classes[i]);
        }
      }
    };
    DOMTokenList[protoProp] = {
      add: function(token) {
        if (arrIndexOf.call(this, token) === -1) {
          this.push(token);
          this.el.className = this.toString();
        }
      },
      contains: function(token) {
        return arrIndexOf.call(this, token) !== -1;
      },
      remove: function(token) {
        var index = arrIndexOf.call(this, token);
        if (index !== -1) {
          this.splice(index, 1);
          this.el.className = this.toString();
        }
      },
      toggle: function(token) {
        if (arrIndexOf.call(this, token) === -1) {
          this.add(token);
        } else {
          this.remove(token);
        }
      },
      toString: function() {
        return this.join(' ');
      }
    };

    objCtr.defineProperty(DOMTokenList[protoProp], 'length', {
      get: function() {
        return this.length;
      }
    });

    view.DOMTokenList = DOMTokenList;

    function defineElementGetter(obj, prop, getter) {
      if (objCtr.defineProperty) {
        objCtr.defineProperty(obj, prop, {
          get: getter
        });
      } else {
        obj.__defineGetter__(prop, getter);
      }
    }

    defineElementGetter(elemCtrProto, 'classList', function() {
      return new DOMTokenList(this);
    });
  }(window));
}

// Console polyfill (for older browsers without console)
if (typeof console === 'undefined') {
  window.console = {};
  var consoleMethods = ['log', 'error', 'warn', 'info', 'debug', 'trace'];
  for (var i = 0; i < consoleMethods.length; i++) {
    console[consoleMethods[i]] = function() {};
  }
}

// Safe wrapper for optional chaining
window.TFLIX_SAFE_GET = function(obj, path) {
  var parts = path.split('.');
  var current = obj;
  for (var i = 0; i < parts.length; i++) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[parts[i]];
  }
  return current;
};
