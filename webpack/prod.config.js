const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env) {
    return merge(BaseConfig(env.env), {
        mode: 'production',
        optimization: {
            minimizer: [
                new UglifyJsPlugin(),
                new OptimizeCSSAssetsPlugin()
            ],
        },
        plugins: [
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('production')
                    }
                }
            }),
            new Webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        ]
    })
}
