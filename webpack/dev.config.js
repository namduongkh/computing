const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config.js')
const ROOT_PATH = process.cwd();
const Config = require('./config.js').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let { folderName } = Config;
if (folderName) { folderName += "/" }

module.exports = function (env) {
    return merge(BaseConfig(env.env), {
        mode: 'development',
        devtool: 'inline-source-map',
        // devServer: {
        //     contentBase: './dist',
        //     hot: true,
        //     compress: true,
        //     port: Config.port || 9999,
        // },
        plugins: [
            // new CleanWebpackPlugin(),
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('development')
                    }
                }
            }),
            new HtmlWebpackPlugin({
                title: 'Developer Helper',
                template: ROOT_PATH + `/${folderName}template.html`
            }),
            new BrowserSyncPlugin({
                host: '0.0.0.0',
                port: Config.port || 9999,
                server: { baseDir: [ROOT_PATH + `/dist`] },
            })
        ]
    })
}
