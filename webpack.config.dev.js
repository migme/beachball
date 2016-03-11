var webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['', '.js']
  },

  module: {
    noParse: [
      /\/sinon.js/
    ],
    preLoaders: [ // << add subject as webpack's preloader
      {
        test: /\.js?$/,
        // exclude this dirs from coverage
        exclude: /(test|node_modules|bower_components)\//,
        loader: 'isparta-instrumenter-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^sinon$/, __dirname + '/node_modules/sinon/pkg/sinon.js')
  ],

  stats: {
    colors: true,
    reasons: true
  },

  progress: true
}
