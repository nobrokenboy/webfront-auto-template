/*
* change by nobrokenboy 2018.3.2
* */
var webpack=require('webpack');
var path=require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/SplitChunksPlugin");
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob=require('glob');
var prefix="../output/static/js/";//配置输出目录
module.exports={
    mode:"development",//必须要的
    entry:{
        "index":"./index.js",

    },
    output:{
        path:path.resolve(__dirname,prefix),
        filename:"[name].bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.(scss|css|sass)/,
                loader:'style-loader!css-loader!sass-loader'//ExtractTextPlugin.extract("style-loader","css-loader","sass-loader")
            },
            {
                test: /\.jade$/,
                loader: "pug-loader"
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader',
                        'pug':'pug-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test:/\.png/,
                loader:'url-loader',
                query:{limit:1024}
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions:['.js','.vue','.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jquery':'jquery/src/jquery.js',
            // 'components':path.join(__dirname,'./develop/static/js/components/components.js'),
            // 'lib':path.join(__dirname,'./develop/static/js/mylibs/lib.js'),
            // 'directive':path.join(__dirname,'./develop/static/js/common_directive.js'),
            // 'config':path.join(__dirname,'./develop/static/js/config.js')
        }
    },
    devServer:{
        historyApiFallback: true,
        noInfo: true,
        inline:true
    },
/*    devtool: '#eval-source-map',*/
    performance: {
        hints: false
    },
    plugins:[
        new webpack.ProvidePlugin({
            jQuery:'jquery',
            $: 'jquery',
           /* _:'lib'*/
        }),
        new CommonsChunkPlugin("common.chunk"),
        new ExtractTextPlugin('')
    ]
};

if (process.env.NODE_ENV === 'development') {//开发环境
    module.exports.devtool = 'eval-source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            ENV_PRO: JSON.stringify(false)
        }),
    ])
}
if (process.env.NODE_ENV === 'test') {//测试环境
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            ENV_PRO: JSON.stringify(false)
        }),
        new UglifyJsPlugin({
            uglifyOptions:{
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
if (process.env.NODE_ENV === 'production') {//生产环境
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            ENV_PRO: JSON.stringify(true)
        }),
        new UglifyJsPlugin({
            uglifyOptions:{
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

console.log("当前的环境："+process.env.NODE_ENV);