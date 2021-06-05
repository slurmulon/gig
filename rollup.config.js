import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
// import nodePolyfills from 'rollup-plugin-node-polyfills'
import pkg from './package.json'

// browser-friendly UMD build
export default [
  {
    input: 'src/index.js',
    output: {
      name: 'gig',
      file: pkg.browser,
      // format: 'umd',
      format: 'esm',
      esModule: false,
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      json(),
      resolve(),
      commonjs({
        esmExternals: false,
        requireReturnsDefault: false,
        ignore: ['bach-cljs']
      }),
      // nodePolyfills(),
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        presets: [['@babel/preset-env', { modules: 'umd' }]],
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
    external: [/@babel\/runtime/, 'bach-js', 'bach-cljs', 'howler', 'performance-now', 'stateful-dynamic-interval'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        plugins: [getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          plugins: [['@babel/plugin-transform-runtime', { useESModules: false }]]
        })]
      }, // exports: 'named', sourcemap: true },
      {
        file: pkg.module,
        format: 'esm',
        plugins: [getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'umd' }]],
          plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
        })]
      } // exports: 'named', sourcemap: true }
    ],
    // plugins: [
    //   json(),
    //   resolve(),
    //   // nodePolyfills()
    //   babel({
    //     exclude: ['**/node_modules/**'],
    //     babelHelpers: 'runtime'
    //   })
    // ]
  }
]
