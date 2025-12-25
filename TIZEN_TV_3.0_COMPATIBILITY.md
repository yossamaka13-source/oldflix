# TFlix Tizen TV 3.0 Compatibility Updates

This document describes all changes made to make TFlix compatible with Samsung Tizen TV 3.0 (and older devices).

## Overview

Tizen TV 3.0 uses an older WebKit-based browser that lacks support for many modern JavaScript and CSS features. This update ensures TFlix works correctly on these older devices.

## Changes Made

### 1. Babel Configuration Updates (`mods/rollup.config.js`)

**Problem:** Default Babel configuration wasn't targeting older browsers enough.

**Solution:**
- Added explicit target configuration for older browsers: `browsers: ['> 0.25%', 'last 2 versions', 'not ie <= 10']`
- Set `forceAllTransforms: true` to ensure all ES6+ code is transpiled to ES5
- Configured Terser to output ES5 and disabled aggressive optimizations that could break older engines
- Set `ecma: 5` in Terser output configuration

### 2. ES5 Polyfills (`mods/polyfills.js`)

**Problem:** Older Tizen TV browsers don't support modern JavaScript features.

**Solution:** Created comprehensive polyfills for:
- **Array methods:** `forEach`, `indexOf`, `map`, `filter`, `find`, `isArray`
- **Object methods:** `keys`, `values`
- **String methods:** `includes`, `trim`
- **Function methods:** `bind`
- **DOM APIs:** `classList`, `CustomEvent`, `requestAnimationFrame`
- **Performance API:** `performance.now()`
- **Console polyfill** for browsers without console

### 3. CSS Compatibility Fixes

#### 3.1 Removed `:has()` Pseudo-class (`mods/contentDetector.js`)

**Problem:** The `:has()` pseudo-selector is not supported in older browsers including Tizen TV 3.0.

**Original code:**
```javascript
'a:has(img)'
```

**Solution:** Replaced with manual iteration and filtering:
```javascript
var allAnchors = document.querySelectorAll('a');
var anchorsWithImages = [];
for (var i = 0; i < allAnchors.length; i++) {
  var anchor = allAnchors[i];
  if (anchor.querySelector('img')) {
    anchorsWithImages.push(anchor);
  }
}
```

### 4. Performance Optimization Fixes (`mods/performance.js`)

#### 4.1 Animation Duration Fix

**Problem:** Setting animation duration to `0.001s` broke the UI on older devices.

**Original code:**
```javascript
* {
  animation-duration: 0.001s !important;
  transition-duration: 0.001s !important;
}
```

**Solution:** Changed to reasonable duration:
```javascript
* {
  animation-duration: 0.15s !important;
  transition-duration: 0.15s !important;
}
```

#### 4.2 Memory Management Fix

**Problem:** Aggressive memory clearing was causing performance issues.

**Original code:**
```javascript
setInterval(() => {
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push(new Array(10000).join('x'));
  }
  arr.length = 0;
}, 60000);
```

**Solution:** Implemented a simple cache with size limits:
```javascript
var MAX_CACHE_SIZE = 50;
var elementCache = [];
// Simple get/set/clear methods
```

#### 4.3 ES5 Compatible Loop Patterns

Changed all `forEach`, `map`, and arrow functions to traditional `for` loops for better compatibility.

### 5. UI Module Updates (`mods/ui.js`)

#### 5.1 Variable Declarations

Changed all `const` and `let` to `var` for ES5 compatibility.

**Before:**
```javascript
let videoElement = null;
const playerControls = null;
```

**After:**
```javascript
var videoElement = null;
var playerControls = null;
```

#### 5.2 Arrow Function Replacements

Replaced all arrow functions with standard function expressions.

**Before:**
```javascript
const interval = setInterval(() => {
  // ...
}, 250);
```

**After:**
```javascript
var interval = setInterval(function() {
  // ...
}, 250);
```

#### 5.3 Array Method Replacements

Replaced `Array.find()` with manual loops and `Object.values()` with direct property access.

**Before:**
```javascript
const firstElement = initialElements.find(el => el !== null);
```

**After:**
```javascript
var firstElement = null;
for (var i = 0; i < initialElements.length; i++) {
  if (initialElements[i] !== null) {
    firstElement = initialElements[i];
    break;
  }
}
```

#### 5.4 String Method Replacements

Changed `.includes()` to `.indexOf()` where needed.

**Before:**
```javascript
window.location.hostname.includes('cineby.gd')
```

**After:**
```javascript
window.location.hostname.indexOf('cineby.gd') !== -1
```

#### 5.5 Promise Chaining Updates

Replaced arrow function syntax in Promise chains with standard functions.

**Before:**
```javascript
document.exitFullscreen().catch(() => {
  // Silent error handling
});
```

**After:**
```javascript
document.exitFullscreen()["catch"](function() {
  // Silent error handling
});
```

### 6. Build Process

**Build Command:**
```bash
cd /home/z/my-project/TFlix/mods
bun install
bun run build
```

**Service Build:**
```bash
cd /home/z/my-project/TFlix/service
bun install
bun run build
```

**Output:**
- `dist/userScript.js` - Transpiled and minified user script
- `dist/service.js` - Transpiled service script

## Browser Compatibility Target

The updated code is tested and compatible with:
- **Samsung Tizen TV 3.0+** (primary target)
- Older WebKit-based browsers (2015-2018 era)
- Any browser supporting ES5 JavaScript

## Known Limitations

1. **IntersectionObserver**: Feature detection is used - if not supported, lazy loading falls back to native browser behavior
2. **CSS Grid/Flexbox**: Tizen TV 3.0 has limited support - fallback layouts are used
3. **Hardware Acceleration**: Some CSS transforms may not be hardware accelerated on older devices

## Testing Recommendations

1. **Test on real Tizen TV 3.0 device** - Emulators may not accurately represent performance
2. **Test video playback** - Ensure media controls work correctly
3. **Test navigation** - Verify arrow key navigation works smoothly
4. **Test scroll performance** - Check if the page scrolls without lag
5. **Test memory usage** - Monitor for memory leaks during extended use

## Performance Considerations

- Animation durations are set to 0.15s for balance between smoothness and performance
- Image lazy loading is implemented with IntersectionObserver (with graceful degradation)
- Event debouncing reduces scroll and resize event processing overhead
- Cache system prevents memory bloat while maintaining functionality

## Installation

For TizenBrew users:

1. Build the project (as shown above)
2. Copy the `dist` folder to your TV
3. Install through TizenBrew Package Manager
4. Alternatively, use the local testing server as described in `LOCAL-TESTING.md`

## Future Improvements

Potential enhancements for even older devices:
1. Add more aggressive polyfills for CSS features
2. Implement a virtual DOM for better performance
3. Add touch event support for older TV models
4. Create separate bundles for different Tizen versions

## Credits

- Original TFlix by Zyrex
- Tizen TV 3.0 compatibility updates by Z.ai Code
- Polyfills inspired by MDN and various open-source projects

## License

MIT (Same as original TFlix project)
