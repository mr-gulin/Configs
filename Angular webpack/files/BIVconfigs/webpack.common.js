var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CompressionPlugin = require("compression-webpack-plugin");
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var appRoot = helpers.root('src', 'app'); // путь до каталога приложения, относительно корневого каталога проекта
var commonAppRoot = helpers.root('..', 'CommonComponents', 'src', 'app'); // путь до каталога приложения CommonComponents, относительно корневого каталога проекта
var commonNodeModules = helpers.root('..', 'CommonComponents', 'node_modules'); // путь до каталога node_modules проекта CommonComponents, относительно корневого каталога проекта
var configRoot = helpers.root('src', 'app', 'config'); // путь до каталога c файлами настроек
var aliasConfig = {
    '@app': appRoot,
    '@common': commonAppRoot,
    '@commonNodeModules': commonNodeModules,
    '@config': configRoot,
};

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [appRoot, commonAppRoot, helpers.root('node_modules'), commonNodeModules], // массив имен каталогов, которые должны быть разрешены к текущему каталогу
        alias: aliasConfig
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('tsconfig.json') }
                    }, 'angular2-template-loader', 'angular-router-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.css$/,
                exclude: [appRoot, commonAppRoot],
                loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
            },
            {
                test: /\.scss$/,
                include: [
                    appRoot, commonAppRoot
                ],
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                include: [
                    appRoot, commonAppRoot
                ],
                loaders: ['to-string-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/assets/i/favicon-16.ico',
            hash: true
        }),

        new ExtractTextPlugin('bundle.css'),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            Pikaday: 'pikaday',
            moment: 'moment'
        }),

        new CopyWebpackPlugin([
            { from: 'src/assets/pdf', to: 'assets/pdf' }
        ], {
            copyUnmodified: true
        })

    ]
};
