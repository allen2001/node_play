// 自动扫描并导入所有Model
const fs = require('fs')
const db = require('./db')

let files = fs.readdirSync(__dirname + '/models')
console.log(files)
// 筛选其中的js文件
files = files.filter((file) => {
  return file.endsWith('.js')
})

const MODELS = {}
for (let file of files) {
  let key = file.substring(0, file.length - 3)
  MODELS[key] = require(__dirname + '/models/' + key)
}
MODELS.sync = () => {
  return db.sync()
}
MODELS.sequelize = db.sequelize // 暴露当前sequelize对象实例

module.exports = MODELS