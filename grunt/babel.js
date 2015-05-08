module.exports = {
  options: {
    sourceMap: true,
    modules: 'umd'
  },
  dist: {
    files: {
      '<%= app.dist %>/migme.js': '<%= app.src %>/migme.js'
    }
  }
}
