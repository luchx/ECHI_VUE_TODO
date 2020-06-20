const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.default = {
    // entry: , //输入文件
    entry: "main.js",
    output: {
        filename: "bundle.js", //输出文件
        path: path.join(__dirname, 'dist'), //输出路径
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        // open:true  //每次都打开一个网页
        hot: true //只渲染一个组件
    },
    resolve: {
        // 将 `.ts` 添加为一个可解析的扩展名。
        extensions: ['.ts', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-[hash].[ext]'
                    }
                }]
            },
        ]
    },
    plugin: [
        // new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ]
}