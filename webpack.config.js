var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',

  stats: {
    colors: true,
    reasons: true
  },

  entry: {
    'app': [
      'webpack/hot/only-dev-server',
      './src/app.js',
    ],
    'app_angular': [
      //'webpack/hot/only-dev-server',
      './src/angular.js',
    ],
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?stage=0']},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
      {test: /\.html$/, loader: 'ngtemplate?module=cyb.oko&relativeTo=' + (path.resolve(__dirname, './')) + '/!html'},
      {test: /\.json$/, loader: 'json'},
    ]
  },
  externals: {
    angular: 'angular',
    'bootstrap-sass': '"bootstrap-sass"',
    'ui.router': '"ui.router"',
    'angular-resource': '"ngResource"',
    'angular-animate': '"ngAnimate"',
    jquery: 'jQuery',
    mathjs: 'mathjs',
    ngReact: 'ngReact',
    react: 'React',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("common.js"),
    new webpack.DefinePlugin({
      DEBUG: true,
      BACKEND_URL: "'http://SAMEHOST:8000/'",
    }),
  ]
};
