'use strict'

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt)

  require('load-grunt-config')(grunt, {
    data: {
      pkg: grunt.file.readJSON('package.json'),
      app: {
        src: 'src',
        dist: 'dist'
      }
    }
  })
}
