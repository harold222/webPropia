const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: [
            "@babel/polyfill",
            './src/app.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'recursos/js/bundle.min.js'
    },
    devtool: 'source-map',
    devServer: {
        port: 4000,
        open: true
    },
    module: {
        rules:[
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            },{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
               test: /\.(sa|sc|c)ss$/,
               use: [
                   miniCss.loader,
                   'css-loader',
                   'postcss-loader',
                   'sass-loader'
               ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'recursos/img/',
                            useRelativePath: true
                        }
                    }
                ]
            },
            {
                loader: 'image-webpack-loader',
                options:  {
                    mozjpeg: {
                        progressive: true,
                        quality: 75
                      },
                      // optipng.enabled: false will disable optipng
                    optipng: {
                        enabled: true,
                    },
                    pngquant: {
                        quality: [0.75, 0.90],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                      // the webp option will enable WEBP
                    webp: {
                        quality: 75
                    }
                }
            }
        ]
    }, plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            hash: true,
            template: './src/index.hbs'
            ,minify: {
                collapseWhitespace: false,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new miniCss({
            filename: '[name].min.css'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        })
    ]
};