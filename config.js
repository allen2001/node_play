// MySQL配置--不同环境读取不同的配置文件
const defaultConfig = './config/config-default.js'
const overrideConfig  = './config/config-override.js'
const testConfig = './config/config-test.js'

const fs = require('fs')

var config = null

if (process.env.NODE_ENV === 'test') {  // 测试环境
  config = require(testConfig)
} else {  // 线上环境
  config = require(defaultConfig)
  // 判断mysql自定义配置文件是否存在
  try {
    if (fs.statSync(overrideConfig).isFile()) {
      console.log('存在mysql自定义配置文件')
      config = Object.assign(config, require(overrideConfig))
    }
  } catch (error) {
    console.log(`can not load ${overrideConfig}!`)
  }
}

// console.log(config)
module.exports = config