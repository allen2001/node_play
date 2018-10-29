// 页面controllers
const { APIError } = require('../rest')
const { handleGetProd } = require('../service/products')

// 首页
const fn_index = async (ctx, next) => {
  ctx.render('index.html', {})
}

// 详情
const fn_detail = async (ctx, next) => {
  let id = ctx.params.id
  let prodObj = await handleGetProd(id)
  if (prodObj == null) {
    ctx.status = 404
    ctx.type = 'text/html'
    ctx.body = '<h1>找不到指定商品! 404 error <a href="/">返回</a></h1>'
    return
  }
  ctx.render('detail.html', { prodObj })
}

// 登录
const fn_login = async (ctx, next) => {
  ctx.render('login.html', {})
}

// 注册
const fn_regi = async (ctx, next) => {
  ctx.render('register.html', {})
}

// exports
module.exports = {
  'GET /': fn_index,
  'GET /detail/:id': fn_detail,
  'GET /login': fn_login,
  'GET /register': fn_regi
}
