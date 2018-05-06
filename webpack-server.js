const path = require('path');
const nodeExternals = require('webpack-node-externals');

const BUILD = path.resolve(__dirname, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'server', 'server.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackSourceMapSupport = require('webpack-source-map-support');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: ['babel-polyfill', ENTRY_PATH],
    output: {
        filename: 'server.js',
        path: BUILD,
        publicPath: '/',
    },
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'cheap-module-source-map',
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
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles.css',
            chunkFilename: '[name].css',
        }),
        new WebpackSourceMapSupport(),
        new WebpackShellPlugin({
            onBuildStart: ['echo "building server ..."'],
            onBuildEnd: ['node --require dotenv/config ./build/server.js'],
        }),
    ],
};
