var path = require('path');
var process = require('process');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const docs = path.join(process.cwd(), 'docs');
const dist = path.join(process.cwd(), 'dist');
const configs = path.join(process.cwd(), 'configs');

module.exports = {

    entry: {
        app: path.join(docs, 'main.ts'),
        vendor: path.join(docs, 'vendor.ts'),
        polyfills: path.join(docs, 'polyfills.ts')
    },

    output: {
        path: path.join(dist, 'docs'),
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        alias: {
            "code-snippet-loader": path.join(configs, 'loaders', 'code-snippet-loader.js')
        }
    },

    module: {
        rules: [{
                test: /\.html$/,
                use: 'html-loader',
                exclude: /(directives|templates|snippets)/
            },
            {
                test: /\.css$/,
                exclude: /snippets/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-code-highlight-loader']
            },
            {
                test: /\.ts$/,
                exclude: /snippets/,
                use: ['awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader']
            },
            {
                test: /\.less$/,
                include: [path.join(docs, 'app'), path.join(process.cwd(), 'src', 'components')],
                use: ['to-string-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [path.join(docs, 'app'), path.join(process.cwd(), 'src', 'components')],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf|mp4|mp3)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },

            /*
                Support Code Snippets
            */
            {
                test: /\.html$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.js$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.css$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.ts$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.txt$/,
                use: 'raw-loader',
                include: /(templates)/
            },

            /*
                Angular 1 Rules
            */
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /snippets/,
                    path.join(process.cwd(), 'src', 'ng1', 'plugins'),
                    path.join(process.cwd(), 'src', 'ng1', 'external')
                ],
                use: {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: [
                            ["es2015", {
                                "modules": false
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.join(process.cwd(), 'src', 'ng1', 'plugins'),
                    path.join(process.cwd(), 'src', 'ng1', 'external')
                ],
                use: [{
                    loader: 'script-loader'
                }, {
                    loader: 'uglify-loader',
                    options: {
                        compress: {
                            warnings: false,
                        },
                        comments: false
                    }
                }]
            },
            {
                test: /\.html$/,
                use: "ng-cache-loader?prefix=[dir]/[dir]",
                include: /(directives|templates)/
            }
        ]
    },

    plugins: [

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(docs)
        ),

        new HtmlWebpackPlugin({
            template: './docs/index.ejs',
            favicon: './docs/favicon.ico'
        }),

        new ExtractTextPlugin("styles.css"),

        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        
        new CopyWebpackPlugin([{
            from: './node_modules/@ux-aspects/ux-aspects/dist',
            to: path.join(dist, 'assets')
        }]),

        new CopyWebpackPlugin([{
            from: path.join(docs, 'app', 'assets'),
            to: path.join(dist, 'assets')
        }]),

        new CopyWebpackPlugin([
            {
                from: path.join(docs, 'app', 'showcase', 'list_view', 'dist'),
                to: path.join(dist, 'showcase', 'list_view', 'dist')
            },
            {
                from: path.join(docs, 'app', 'showcase', 'list_view', 'bower_components'),
                to: path.join(dist, 'showcase', 'list_view', 'bower_components')
            }
        ]),

        new CopyWebpackPlugin([
            {
                from: path.join('./node_modules/@ux-aspects/ux-aspects/dist'),
                to: path.join(dist, 'showcase', 'list_view', 'dist')
            }
        ]),

        new CopyWebpackPlugin([
            {
                from: path.join(docs, 'app', 'showcase', 'charts', 'dist'),
                to: path.join(dist, 'showcase', 'charts', 'dist')
            },
            {
                from: path.join(docs, 'app', 'showcase', 'charts', 'bower_components'),
                to: path.join(dist, 'showcase', 'charts', 'bower_components')
            }
        ]),

        new CopyWebpackPlugin([
            {
                from: path.join('./node_modules/@ux-aspects/ux-aspects/dist'),
                to: path.join(dist, 'showcase', 'charts', 'dist')
            }
        ]),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            comments: false
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': '"production"'
            }
        })
    ],

    stats: 'minimal'
};