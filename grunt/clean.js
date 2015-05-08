module.exports = {
  test: {
    files: [{
      dot: true,
      src: [
        'coverage'
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
}
