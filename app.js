// 项目入口文件

// import
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

// 创建实例
const app = new Koa()

// 判断当前环境
const isProduction = process.env.NODE_ENV === 'production'

// 自动扫描加载controllers目录下的所有js文件
const controller = require('./controller')

// 打印请求消息
app.use(async (ctx, next) => {
  console.log(`Request ${ctx.method}: ${ctx.url}`)
  await next()
})

// 开发环境下处理静态文件的middleware
if (!isProduction) {
  const staticFiles = require('./static-files')
  app.use(staticFiles('/static/', __dirname + '/static/'))
}

// 添加rest方法
const restFn = require('./rest')
app.use(restFn.restify())

// 集成Nunjucks
const templating = require('./templating')
app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}))

// 解析请求体
app.use(bodyParser())

// add controller
app.use(controller())

// listen
app.listen(80)
console.log('启动成功!')