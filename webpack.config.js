var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"development"',
        //     'process.env.BABEL_ENV': '"development'
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                },
                exclude: /(node_modules|bower_components)/,
                include: __dirname
            },
            {
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: __dirname
            },

{
            test: /\.(png|jp(e*)g|svg)$/,  
            loaders: ['url-loader?limit=8000&name=images/[hash]-[name].[ext]']
        }
        ]
    }
};