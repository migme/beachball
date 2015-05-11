module.exports = {
   options: {
    browserifyOptions: {
       debug: true,
       standalone: 'Migme'
    },
    transform: [
      ['babelify', {
        sourceMapRelative: '<%= app.src %>'
      }]
    ]
  },
  bundle: {
    files: {
      '<%= app.dist %>/migme.min.js': '<%= app.src %>/migme.js'
    }
  }
}
