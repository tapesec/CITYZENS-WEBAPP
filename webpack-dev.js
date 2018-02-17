const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BUILD = path.resolve(__dirname, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'client', 'index.js');

module.exports = {
    entry: ['babel-polyfill', ENTRY_PATH],
    output: {
        filename: 'bundle.js',
        path: BUILD,
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: NODE_MODULES,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
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
                        loader: 'postcss-loader',
                        options: { importLoaders: 1 }, // prefix css properties
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            path: path.join(__dirname, '.env'), // load this now instead of the ones in '.env'
            safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: false, // hide any errors
        }),
    ],
    resolve: {
        extensions: ['.js', '.css', '.scss'],
    },
};
