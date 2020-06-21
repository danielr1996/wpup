const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    watch: false,
    entry: './src/index.ts',
    target: 'node',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                // exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin({configFile: "tsconfig.json"}),]
    },
    plugins: [
        new webpack.BannerPlugin({banner: "#!/usr/bin/env node", raw: true, entryOnly: true}),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
