var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/app/controller/index.ts',
        cart: './src/app/controller/cart.ts',
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                test:/\.scss$/,
                loader:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(png|jpg|svg)$/,
                use:[{
                    loader: "file-loader",
                    options: {
                        limit: 10000,
                        name: '[name].[ext]',
                        outputPath: "img/",
                        publicPath: "img/",
                        // limit: 2000000,
                    }
                }]
            }
        ]
    },
    resolve:{
      extensions:['.ts','.js']  
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/Views/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/app/Views/cart.html',
            chunks:['cart']
        })
       
    ],
    devServer:{
        contentBase: './dist'
    }
}