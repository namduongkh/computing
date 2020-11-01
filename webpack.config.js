global.BASE_PATH = __dirname;

function buildConfig (options) {
  return require(`./webpack/${options.env}.config.js`)({ env: options.env })
}

module.exports = buildConfig
