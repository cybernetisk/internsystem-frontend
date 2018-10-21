const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')
const git = require('git-rev-sync')

const production = process.env.NODE_ENV === 'production'
const STYLE_LOADER = production ? MiniCssExtractPlugin.loader : 'style-loader'

const hash_type = production ? 'chunkhash' : 'hash'

const config = {
  mode: production ? 'production' : 'development',
  name: 'client',
  target: 'web',
  entry: {
    app: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    chunkFilename: `[name].[${hash_type}].js`,
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/',
    filename: `[name].[${hash_type}].js`,
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          STYLE_LOADER,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          STYLE_LOADER,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        // TODO: Is this used?
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      'src/robots.txt',
      // Allow to override environment during development.
      // If the file exists it will get prioritied before the template.
      {
        from: 'env.*.js',
        to: 'env.js',
        test: /env\.override\.js$/,
      },
      {
        from: 'env.*.js',
        to: 'env.js',
        test: /env\.template\.js$/,
      },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        favicons: true,
        firefox: false,
      },
      prefix: 'icons/[hash]/',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        manifest: {
          name: 'manifest',
          test: /src[\\/]manifest\.js$/,
          priority: 10,
          enforce: true,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: -10,
          enforce: true,
        },
      },
    },
    // Ensure all chunk information only lands in the manifest file
    // to avoid uneeded cache invalidation.
    runtimeChunk: {
      name: 'manifest',
    },
  },
}

config.plugins.push((
  new webpack.DefinePlugin({
    DEBUG: production ? true : false,
    __BUILD_INFO__: JSON.stringify({
      buildTime: new Date().toString(),
      gitCommitShort: git.short(),
    }),
  })
))

if (production) {
  config.optimization.noEmitOnErrors = true

  // Split CSS to separate files
  config.plugins.push((
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name].[${hash_type}].css`,
      chunkFilename: `[name].[${hash_type}].css`,
    })
  ))
}

module.exports = config
