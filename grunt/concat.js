module.exports = {
  dist: {
    src: ['node_modules/babel/browser-polyfill.js', '<%= app.dist %>/migme.js'],
    dest: '<%= app.dist %>/migme.js'
  }
}
