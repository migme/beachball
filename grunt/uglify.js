module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
    sourceMap: true,
    sourceMapIn: '<%= app.dist %>/<%= pkg.name %>.min.js.map'
  },
  build: {
    src: '<%= app.dist %>/<%= pkg.name %>.min.js',
    dest: '<%= app.dist %>/<%= pkg.name %>.min.js'
  }
}
