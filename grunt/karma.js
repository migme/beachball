var assign = require('lodash.assign')

var karma = {
  runner: {
    // configFile: 'test/karma.conf.js',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'chai', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      { src: ['test/**/*.spec.js'] }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['babelify', 'browserify-istanbul']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text-summary' }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  }
}

var customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer'
  }
}

if (process.env.CI_NAME === 'travis-ci') {
  assign(karma.runner, {
    sauceLabs: {
      testName: 'Web App Unit Tests'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'coverage', 'saucelabs']
  })
} else if (process.env.CI_NAME === 'codeship') {
  assign(karma.runner, {
  })
} else if (!process.env.CI) {
  assign(karma.runner, {
  })
}

module.exports = karma
