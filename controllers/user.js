const { APIError } = require('../rest')
// 引入service
const { handleUserRegister, handleUserLogin } = require('../service/users')

// 注册账号
const userRegister = async (ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let nickname = ctx.request.body.nickname
  let userSex = ctx.request.body.userSex
  let result = await handleUserRegister(username, password, nickname, userSex)
  if (result == null) {
    throw new APIError('error', '已存在此用户名')
  }
  // rest res
  ctx.rest(result)
}

// 登录账号
const userLogin = async (ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let result = await handleUserLogin(username, password)
  if (result.err) { // 登录失败
    throw new APIError('error', result.message)
  }
  let userinfo = result.username
  // 设置cookie(字符串转成base64)
  ctx.cookies.set('username', new Buffer(userinfo).toString('base64'))
  // rest res
  ctx.rest({
    msg: '登录成功!'
  })
}

// 退出登录
const userLogout = async (ctx, next) => {
  // 清除登录信息的cookie
  ctx.cookies.set('username', '', { maxAge: 0 })
  // rest res
  ctx.rest({ msg: '退出成功!' })
}

// exports
module.exports = {
  'POST /api/register': userRegister,
  'POST /api/login': userLogin,
  'GET /api/logout': userLogout
}