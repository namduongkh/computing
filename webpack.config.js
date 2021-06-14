require('babel-core/register')
require('babel-polyfill')

global.BASE_PATH = __dirname;

function buildConfig(options) {
  return require(`./webpack/${process.env.ENV || 'dev'}.config.js`)({ env: process.env.ENV })
}

module.exports = buildConfig
