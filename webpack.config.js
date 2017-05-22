const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let plugins = [
    new HtmlWebpackPlugin({
        template: './src/apps/index/index.html',
        inject: false
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push( new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }));
}

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/apps/index/index')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: plugins
}
