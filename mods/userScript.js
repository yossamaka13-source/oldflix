// Import polyfills first (must be loaded before any other code)
import './polyfills.js';
import 'whatwg-fetch';
import './spatial-navigation-polyfill.js';
import './ui.js';
import './contentDetector.js';
import { initializePerformanceOptimizations } from './performance.js';

// Initialize performance optimizations early
initializePerformanceOptimizations();
