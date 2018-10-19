// 处理静态文件的middleware
const path = require('path')
const mime = require('mime')  // mime包 lookup() 改名为 getType()
const fs = require('mz/fs')

function staticFiles(url, dir) {
  return async (ctx, next) => {
    // console.log('PATH: ' + ctx.request.path)
    let reqPath = ctx.request.path
    if (reqPath.startsWith(url)) {
      // 获取文件完整路径
      let filepath = path.join(dir, reqPath.substring(url.length))
      console.log('文件完整路径: ' + filepath)
      if (await fs.exists(filepath)) {
        // 查找文件的mime
        ctx.type = mime.getType(filepath)
        // 读取文件内容并赋值给response.body
        ctx.body = await fs.readFile(filepath)
      } else {
        // 文件不存在
        ctx.response.status = 404
      }
    } else {
      // 不是以指定前缀(static)开头的url
      await next()
    }
  }
}

module.exports = staticFiles