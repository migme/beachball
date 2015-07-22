var assign = require('lodash.assign')
var pkg = require('./package.json')
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
    'karma-sauce-launcher',
    'karma-sourcemap-loader',
    'karma-coverage',
    'karma-spec-reporter',
    'karma-webpack'
  ],

  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome', 'Firefox']
}

var customLaunchers = {
  // sl_android: {
  //   base: 'SauceLabs',
  //   browserName: 'android'
  // },
  sl_ie: {
    base: 'SauceLabs',
    browserName: 'internet explorer'
  }
  // sl_ipad: {
  //   base: 'SauceLabs',
  //   browserName: 'ipad'
  // }
}

if (process.env.TRAVIS) {
  assign(options, {
    sauceLabs: {
      testName: pkg.name
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['spec', 'coverage', 'saucelabs']
  })
}

if (process.env.CI_NAME === 'codeship') {
  assign(options, {
    reporters: ['spec', 'coverage']
  })
}

module.exports = function (config) {
  config.set(options)
}
