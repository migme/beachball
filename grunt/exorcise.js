module.exports = {
  bundle: {
    options: {},
    src: '<%= app.dist %>/<%= pkg.name %>.min.js',
    dest: '<%= app.dist %>/<%= pkg.name %>.min.js.map'
  }
}
