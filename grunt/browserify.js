module.exports = {
   options: {
    browserifyOptions: {
       debug: true,
       standalone: 'Beachball'
    },
    transform: [
      ['babelify', {
        sourceMapRelative: '<%= app.src %>'
      }]
    ]
  },
  bundle: {
    files: {
      '<%= app.dist %>/<%= pkg.name %>.min.js': '<%= pkg.main %>'
    }
  }
}
