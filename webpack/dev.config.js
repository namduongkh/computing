const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config.js')
const ROOT_PATH = process.cwd();

module.exports = function (env) {
    return merge(BaseConfig(env.env), {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            contentBase: ROOT_PATH,
            compress: true,
            port: 9999
        },
        plugins: [
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('development')
                    }
                }
            })
        ]
    })
}
