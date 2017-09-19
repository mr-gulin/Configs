var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },


  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: helpers.root('src', 'assets', 'i', 'operations'),
        glob: '*.png'
      },
      target: {
        image: helpers.root('dist', 'assets', 'sprite.png'),
        css: helpers.root('dist', 'sprite.css')
      },
      apiOptions: {
        cssImageRef: "assets/sprite.png"
      }
    }),
  ],

  watch: true,

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});