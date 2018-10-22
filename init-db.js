// process.env.NODE_ENV = 'production'
// 初始化数据库
const model = require('./model')
// 自动创建数据库(先清空后创建)
model.sync().then(() => {
  console.log('init db ok.')
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(0)
})

