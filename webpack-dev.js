const path = require('path');
const webpack = require('webpack');
const BUILD = path.resolve(__dirname, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'client', 'index.js');

module.exports = {
    entry: ['babel-polyfill', ENTRY_PATH],
    output: {
        filename: 'bundle.js',
        path: BUILD,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: NODE_MODULES,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        noquotes: true,
                        stripdeclarations: true,
                        iesafe: true,
                    },
                },
            },
        ],
    },
    devServer: {
        contentBase: BUILD,
        hot: true,
        compress: true,
        port: 1234,
        open: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    resolve: {
        extensions: ['.js', '.css', '.scss']
    },
};
