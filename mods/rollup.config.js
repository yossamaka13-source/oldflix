import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';

export default [
  {
    input: 'userScript.js',
    output: {
      file: '../dist/userScript.js',
      format: 'iife'
    },
    plugins: [
      string({
        include: '**/*.css'
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            targets: {
              // Target Tizen TV 3.0 (based on older WebKit browser)
              browsers: ['> 0.25%', 'last 2 versions', 'not ie <= 10']
            },
            // Force transpilation to ES5
            forceAllTransforms: true,
            // Don't use modules in transpilation (we use IIFE)
            modules: false,
            // Disable regenerator to avoid async/await issues
            useBuiltIns: false
          }]
        ]
      }),
      terser({
        compress: {
          // Disable compression features that might break older engines
          arrows: false,
          collapse_vars: false,
          comparisons: false,
          computed_props: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          inline: false,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          switches: false,
          typeofs: false
        },
        mangle: {
          // Disable mangling to avoid potential issues
          keep_classnames: true,
          keep_fnames: true
        },
        output: {
          // Ensure ES5 output
          ecma: 5,
          // Keep comments for debugging
          comments: false
        }
      })
    ]
  }
];
