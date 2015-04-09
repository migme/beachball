'use strict'

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    // Settings
    app: {
      src: 'src',
      dist: 'dist'
    },

    babel: {
      options: {
        sourceMap: true,
        modules: 'umd',
        experimental: true
      },
      dist: {
        files: {
          '<%= app.dist %>/migme.js': 'src/migme.js'
        }
      }
    },

    concat: {
      dist: {
        src: ['node_modules/babel/browser-polyfill.js', '<%= app.dist %>/migme.js'],
        dest: '<%= app.dist %>/migme.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= app.dist %>/<%= pkg.name %>.js',
        dest: '<%= app.dist %>/<%= pkg.name %>.min.js'
      }
    },

    // Lint all the things
    eslint: {
      target: [
        'test/**.*.js',
        '<%= app.src %>/**/*.js'
      ]
    },

    // Empties folders to start fresh
    clean: {
      test: {
        files: [{
          dot: true,
          src: [
            'test/coverage/*'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/{,*/}*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  })

  grunt.registerTask('test', [
    'clean:test',
    'eslint',
    'babel',
    'karma'
  ])

  // Default task(s).
  grunt.registerTask('build', [
    'clean:dist',
    'eslint',
    'babel',
    'concat',
    'uglify'
  ])

  grunt.registerTask('default', ['test', 'build'])
}
