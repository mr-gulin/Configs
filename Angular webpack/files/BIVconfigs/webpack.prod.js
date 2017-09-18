var webpackMerge = require('webpack-merge');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const PUBLIC_PATH = 'https://http://rybinsk.bivgroup.com/docker/life/lk/';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('..', '..', 'sberlifelk'),
        publicPath: '',
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
                image: helpers.root('..', '..', 'sberlifelk', 'assets', 'sprite.png'),
                css: helpers.root('..', '..', 'sberlifelk', 'sprite.css')
            },
            apiOptions: {
                cssImageRef: "assets/sprite.png"
            }
        }),
        new SWPrecacheWebpackPlugin({
            navigateFallback: PUBLIC_PATH + 'index.html',
            minify: true,
            filename: 'service-worker.js',
            staticFileGlobs: [
                'dist/index.html',
                'dist/**.js',
                'dist/**.css',
                'dist/assets/**.*',
            ],
            stripPrefix: 'dist', // stripPrefixMulti is also supported 
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/], // use this to ignore sourcemap files
            dontCacheBustUrlsMatching: /\.\w{8}\./
        })
    ]
});