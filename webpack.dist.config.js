var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: false,
  debug: false,
  devtool: false,

  stats: {
    colors: true,
    reasons: false
  },

  entry: {
    'app': [
      './src/app.js',
    ],
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?stage=0']},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
      {test: /\.json$/, loader: 'json'},
    ]
  },
  externals: {
    'bootstrap-sass': '"bootstrap-sass"',
    'ui.router': '"ui.router"',
    mathjs: 'mathjs',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
    new webpack.NoErrorsPlugin(),

    // keeps hashes consistent between compilations
    new webpack.optimize.OccurenceOrderPlugin(),

    // removes a lot of debugging code in React
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }}),

    new webpack.DefinePlugin({
      DEBUG: false,
      BACKEND_URL: JSON.stringify(process.env.BACKEND_URL || '/'),
    }),
  ]
};
