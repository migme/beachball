var assign = require('lodash.assign')
var pkg = require('../package.json')

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

var karma = {
  options: {
    configFile: 'karma.conf.js',
    autoWatch: false,
    singleRun: true
  },
  runner: {}
}

if (process.env.TRAVIS) {
  assign(karma.runner, {
    sauceLabs: {
      testName: pkg.name
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['mocha', 'coverage', 'saucelabs']
  })
}

if (process.env.CI_NAME === 'codeship') {
  assign(karma.runner, {
    reporters: ['mocha', 'coverage']
  })
}

module.exports = karma
