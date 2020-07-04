const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const copyPlugin = require("copy-webpack-plugin");
const libreriasExternas = require("../assets");

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
        new htmlWebpackPlugin({
            filename: 'portfolio.html',
            hash: true,
            template: './src/view/portfolio.hbs'
            ,minify: {
                collapseWhitespace: false,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new htmlWebpackPlugin({
            filename: '404.html',
            hash: true,
            template: './src/view/404.hbs'
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
        }),
        new copyPlugin({
            patterns: libreriasExternas.map(library => {
                return {
                    from: path.resolve(__dirname, `../node_modules/${library}`),
                    to: path.resolve('dist/libs')
                }
            })
        })
    ]
};