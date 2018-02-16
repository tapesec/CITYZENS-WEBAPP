const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BUILD = path.resolve(__dirname, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'server', 'server.js');

module.exports = {
    entry: ['babel-polyfill', ENTRY_PATH],
    output: {
        filename: 'server.js',
        path: BUILD,
    },
    target: 'node',
    externals: [nodeExternals()],
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 },
                        },
                        {
                            loader: 'postcss-loader',
                            // prefix css properties
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
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
    resolve: {
        extensions: ['.js', '.css', '.scss'],
    },
    plugins: [new ExtractTextPlugin('styles.css')],
};
