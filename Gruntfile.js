'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    //Settings
    app: {
      src: 'src',
      dist: 'dist'
    },

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/migme.js': 'src/migme.js'
        }
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

    eslint: {
      target: ['<%= app.src %>/<%= pkg.name %>.js']
    },

    // Empties folders to start fresh
    clean: {
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
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  // Default task(s).
  grunt.registerTask('build', [
    'clean:dist',
    'eslint',
    'babel',
    'uglify'
  ]);

  grunt.registerTask('default', ['test', 'build']);

};
