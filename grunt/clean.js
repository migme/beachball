module.exports = {
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
}
