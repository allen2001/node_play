// 页面controllers

// 首页
const fn_index = async (ctx, next) => {
  ctx.render('index.html', {})
}

// exports
module.exports = {
  'GET /': fn_index
}
