module.exports = {
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
}
