var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
      main: [
        './public/javascripts/app.js',
        './public/javascripts/text-sync.js',
        './public/javascripts/date-format.js',
        './public/javascripts/markdown.js',
        './public/stylesheets/style.css',
        './public/stylesheets/icon.css',
        './public/stylesheets/github-markdown.css',
      ],
      static: [
        './node_modules/marked/marked.min.js',
        './node_modules/material-design-lite/material.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/material-design-lite/material.min.css'
      ]
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js|jsx$/, loaders: ['babel'] },
            { test: /\app.js$/, loader: "eslint-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
}
