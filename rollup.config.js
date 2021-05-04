import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import pkg from './package.json'

// browser-friendly UMD build
export default [
  {
    input: 'src/index.js',
    output: {
      name: 'gig',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
        babelHelpers: 'bundled'
      })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['bach-js', 'howler', 'performance-now', 'stateful-dynamic-interval'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      json(),
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
]
