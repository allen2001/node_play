// 上传controllers
const fs = require('fs')
const path = require('path')
// 上传缩略图
const fn_avatar = async (ctx, next) => {
  console.log('处理客户端文件上传:')
  // 获取上传的文件对象
  let file = ctx.request.files.filename
  // 创建可读流
  let reader = fs.createReadStream(file.path)
  let filepath = path.join(__dirname, '../static/upload/') + '/' + encodeURI(file.name)
  // 创建可写流
  let upStream = fs.createWriteStream(filepath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  // 删除之前上传的文件对象
  fs.unlinkSync(file.path)
  // 返回文件路径
  ctx.rest({
    path: `/static/upload/${file.name}`
  })
}

// exports
module.exports = {
  'POST /api/upload': fn_avatar
}
