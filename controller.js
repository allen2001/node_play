// controllers middleware
const fs = require('fs')
const router = require('koa-router')()

function addControllers(dir) {
  // 列出路由文件列表
  let files = fs.readdirSync(__dirname + '/' + dir)
  // 过滤出.js文件
  files = files.filter((file) => {
    return file.endsWith('.js')
  })
  // 处理每个js文件
  files.forEach((file) => {
    // 导入当前的js文件
    let mapping = require(__dirname + `/${dir}/` + file)
    // 处理当前文件的每一个路由配置
    addMapping(mapping)
  })
}

function addMapping(mapping) {
  for (let key in mapping) {
    if (key.startsWith('GET')) {  // 处理GET请求
      let url = key.substring(4)
      router.get(url, mapping[key])
    } else if (key.startsWith('POST')) {  // 处理POST请求
      let url = key.substring(5)
      router.post(url, mapping[key])
    } else {
      console.error(`添加路由失败: 无效的请求方式 ${key}`)
    }
  }
}

// exports
module.exports = (dir) => {
  let dirpath = dir || 'controllers'
  // 配置路由
  addControllers(dirpath)
  // 返回路由中间件
  return router.routes()
}