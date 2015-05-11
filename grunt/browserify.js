module.exports = {
   options: {
      browserifyOptions: {
         debug: true
      },
      transform: ['babelify'],
      plugin: [
        [
          'minifyify',
          {
            map: false
          }
        ]
      ]
   },
  dist: {
    files: {
      '<%= app.dist %>/migme.min.js': '<%= app.src %>/migme.js'
    }
  }
}
