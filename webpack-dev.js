const path = require('path');
const Dotenv = require('dotenv-webpack');

const BUILD = path.resolve(__dirname, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'client', 'index.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

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
                test: /\.css$/,
                // only turn on standard global CSS loader for the material directories
                // These paths are the same as above and specific to your system, so change accordingly
                include: [
                    path.resolve('./node_modules/material-components-web'),
                    path.resolve('./node_modules/@material'),
                ],
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s?css$/,
                exclude: [
                    path.resolve('./node_modules/material-components-web'),
                    path.resolve('./node_modules/@material'),
                ],
                use: [
                    MiniCssExtractPlugin.loader,
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

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles.css',
            chunkFilename: '[name].css',
        }),
        new Dotenv({
            path: path.join(__dirname, '.env'), // load this now instead of the ones in '.env'
            safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: false, // hide any errors
        }),
        new WebpackShellPlugin({
            onBuildStart: ['echo "building client ..."'],
            onBuildEnd: ['npm run server:build'],
        }),
    ],
    resolve: {
        extensions: ['.js', '.css', '.scss'],
    },
};
