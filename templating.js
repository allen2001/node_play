// 集成Nunjucks
const nunjucks = require('nunjucks')

function createEnv(path, opts) {
  var
      autoescape = opts.autoescape === undefined ? true : opts.autoescape,
      noCache = opts.noCache || false,
      watch = opts.watch || false,
      throwOnUndefined = opts.throwOnUndefined || false,
      env = new nunjucks.Environment(
          new nunjucks.FileSystemLoader(path || 'views', {
              noCache: noCache,
              watch: watch,
          }), {
              autoescape: autoescape,
              throwOnUndefined: throwOnUndefined
          });
  if (opts.filters) {
      for (var f in opts.filters) {
          env.addFilter(f, opts.filters[f]);
      }
  }
  return env;
}

function templating(path, opts) {
  // 创建Nunjucks的env对象
  let env = createEnv(path, opts)
  // 
  return async (ctx, next) => {
    // 给ctx绑定render函数
    // console.log('给ctx绑定render函数')
    // 通过ctx.state设置公共model变量
    ctx.state.common = "页面公共数据"
    ctx.render = function(view, model) {
      // 设置Content-type
      ctx.type = 'text/html'
      // 把render后的内容赋值给response.body
      ctx.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
    }
    // 执行下一个中间件
    await next()
  }
}

module.exports = templating