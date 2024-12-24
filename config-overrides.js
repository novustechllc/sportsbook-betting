/* config-overrides.js */
const webpack = require('webpack');
// const paths = require('react-scripts-ts/config/paths')

module.exports = function override(config, env) {
    //do stuff with the webpack config...]

    config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            transpileOnly: true,
            configFile: 'tsconfig.json',
        },
    })

    config.resolve.extensions = [
        '*', '.js', '.jsx', '.ts', '.tsx'
    ]

    // config.module.rules.push({
    //     test: /\.(js|jsx)$/,
    //     include: paths.appSrc,
    //     loader: require.resolve('babel-loader'),
    //     options: {
    //         babelrc: false,
    //         presets: [require.resolve('babel-preset-react-app')],
    //         cacheDirectory: true,
    //     },
    // })

    config.resolve.fallback = {
        url: require.resolve('url'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert/'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve("path-browserify")
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}