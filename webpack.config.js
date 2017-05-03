/**
 * Created by KIM DOEUN on 2017-04-30.
 */

'use strict';
const
    webpack = require('webpack'),
    loader = __dirname + '/webpack.loader',
    path = require('path');
const APP_PATH = path.join(__dirname, 'js/source');
const APP_SRC_PATH = path.join(__dirname, 'js/source');
const PKG = require(path.join(__dirname, 'package.json'));
const MODULES = PKG.dependencies;
const EXCLUDED_SRC = /(__tests__|node_modules)/;

//var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');



var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = {
    cache: false,
    context: APP_PATH,
    entry: {
        //mainBundle :__dirname + '/main.js',
        AppBundle : __dirname + '/js/source/App.js'

    },

    output: {
        //path: __dirname,
        path: __dirname + '/js/build',
        pathinfo: true,
        filename: '[name].js'
    },
    node: {
        global: true,
        __dirname: false,
        __filename: false
    },
    //target: 'electron-main',
    target: 'electron-renderer',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: EXCLUDED_SRC,
                include: [
                    APP_SRC_PATH
                ],
                loader: loader
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'es2015',
                        "react"
                    ],
                    plugins : [
                        //"transform-remove-console"
                    ]
                }
            }
        ]
    },
    externals: nodeModules,
    // plugins: [
    //     new webpack.IgnorePlugin(/\.(css|html|json|md|txt)$/),
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NamedModulesPlugin()
    // ]
};


module.exports = config