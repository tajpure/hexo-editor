var path = require('path');
var webpack = require("webpack");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
            './public/javascripts/app.js',
            './public/javascripts/marked.js',
            './public/javascripts/markdown.js',
            './public/javascripts/text-sync.js',
            './public/javascripts/material.min.js',
            './public/javascripts/jquery-1.11.3.min.js',
            './public/javascripts/date-format.js'
            ],
    output: {
        path: path.join(__dirname, '/public/javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js|jsx$/, loaders: ['babel'] },
            {test: /\app.js$/, loader: "eslint-loader"}
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new BrowserSyncPlugin({
        proxy: 'localhost:2048',
        port: 3000
      })
    ]
}
