const path = require('path');
const webpack = require('webpack');
//PWA https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
const { GenerateSW } = require('workbox-webpack-plugin');

//代替extract-text-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    module: {
        rules: [{
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-react', 'babel-preset-es2015']
                    }

                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Progressive Web Application'
        }),
        new MiniCssExtractPlugin({
            filename: "[contentHash:5].css",
            chunkFilename: "[id].css"
        }),
        //https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
        //https://blog.csdn.net/mjzhang1993/article/details/79850235
        new GenerateSW({
            cacheId: 'webpack-pwa',
            swDest: 'service-worker.js',
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: /.*\.js/,
                // handler: 'networkFirst',    // 网络优先 
                handler: 'cacheFirst',       // 缓存优先
            }]
        }),
        //webpack4 移除了 CommonsChunkPlugin
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // 指定公共 bundle 的名称。
        // })
    ]
};