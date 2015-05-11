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
        '<%= app.dist %>'
      ]
    }]
  }
}
