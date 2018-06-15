const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

//https://doc.webpack-china.org/guides/tree-shaking/
//移除 JavaScript 上下文中的未引用代码(dead-code)
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        //https://doc.webpack-china.org/guides/production/#指定环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(),
    ],
    devtool: 'source-map',
});