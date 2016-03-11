var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/lib/'),
    filename: 'index.js',
    library: 'beachball',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  ],

  stats: {
    colors: true,
    reasons: true
  },

  progress: true
}
