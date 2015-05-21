module.exports = {
  options: {
    sourceMap: true,
    modules: 'umd'
  },
  dist: {
    files: {
      '<%= app.dist %>/<%= pkg.name %>.js': '<%= pkg.main %>'
    }
  }
}
