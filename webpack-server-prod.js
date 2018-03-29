const path = require('path');
const nodeExternals = require('webpack-node-externals');
const DIST = path.resolve(__dirname, 'dist');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'server', 'server.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['babel-polyfill', ENTRY_PATH],
    output: {
        filename: 'server.js',
        path: DIST,
        publicPath: '/',
    },
    target: 'node',
    externals: [nodeExternals()],
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
    ],
};
