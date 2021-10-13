const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const module_config = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ],
};

const resolve_config = {
    extensions: ['.tsx', '.ts', '.js'],
};

const server_config = {
    entry: './src/server/index.ts',
    target: "node",
    externals: [nodeExternals()],
    module: module_config,
    resolve: resolve_config,
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [new Dotenv()],
};

const client_config = {
    entry: './src/browser/index.ts',
    module: module_config,
    resolve: resolve_config,
    output: {
        filename: 'client/app.js',
        path: path.resolve(__dirname, 'build'),
    }
};

module.exports = [
    server_config,
    client_config,
]