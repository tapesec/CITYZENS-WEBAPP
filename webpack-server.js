const path = require('path');
const webpack = require('webpack');
const BUILD = path.resolve(__dirname, 'build');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const ENTRY_PATH = path.resolve(__dirname, 'src', 'server', 'server.js');

module.exports = {
    entry: ENTRY_PATH,
    output: {
        filename: 'app.js',
        path: BUILD
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: NODE_MODULES,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
};
