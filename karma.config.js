// var isparta = require('isparta')
// var istanbul = require('browserify-istanbul')
var webpackConfig = require('./webpack.config')
webpackConfig.devtool = 'inline-source-map'

// var argv = require('minimist')(process.argv.slice(2))

var options = {
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha', 'chai-as-promised', 'sinon-chai'],

  files: [
    './node_modules/babel-core/browser-polyfill.js',
    'test/**/*.js'
  ],

  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'test/**/*.js': ['webpack', 'sourcemap']
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    // webpack-dev-middleware configuration
    noInfo: true,
    colors: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },

  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['spec', 'coverage'],

  coverageReporter: {
    dir: 'coverage',
    reporters: [
      { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
      { type: 'text' },
      { type: 'text-summary' }
    ]
  },

  singleRun: true,
  colors: true,

  plugins: [
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-chai',
    'karma-mocha',
    'karma-sinon-chai',
    'karma-chai-as-promised',
    'karma-sourcemap-loader',
    'karma-coverage',
    'karma-spec-reporter',
    'karma-webpack'
  ],

  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome', 'Firefox']
}

// if (!argv.coverage || argv.coverage === true) {
//   options.browserify.transform.unshift(
//     istanbul({
//       instrumenter: isparta
//     })
//   )
//   options.reporters.push('coverage')
//   options.coverageReporter = {
//     dir: 'coverage',
//     reporters: [
//       { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
//       { type: 'text' },
//       { type: 'text-summary' }
//     ]
//   }
// } else {
//   options.browserify.transform.unshift(
//     ['babelify', { stage: 0 } ]
//   )
// }

module.exports = function (config) {
  config.set(options)
}
