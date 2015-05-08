module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  },
  build: {
    src: '<%= app.dist %>/<%= pkg.name %>.js',
    dest: '<%= app.dist %>/<%= pkg.name %>.min.js'
  }
}
