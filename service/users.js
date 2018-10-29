// 处理用户信息相关的业务逻辑

// 导入model模型
const { User } = require('../model')

// 注册账号
const handleUserRegister = async (username, passwd, name, gender) => {
  // 查询数据库中是否已注册此账户名
  let user = await User.findAll({
    where: { username }
  })
  if (user.length !== 0) {  // 已经存在此账号
    return null
  }
  // 注册
  var name = name || username
  let newUser = await User.create({
    username,
    passwd,   // 不加密?
    name,
    gender
  })
  let userinfo = {
    username: newUser.username,
    name: newUser.name,
    gender: newUser.gender
  }
  return userinfo
}

// 账号登录
const handleUserLogin = async (username, passwd) => {
  // 查询数据库中是否已注册此账户名
  let user = await User.findAll({
    where: { username }
  })
  if (user.length === 0) {  // 无此账号
    return { err: true, message: '此账号未注册' }
  }
  // 验证密码
  user = user[0]
  console.log(user)
  if (user.passwd !== passwd) { // 密码不正确
    return { err: true, message: '密码错误' }
  }
  // 登录成功
  return { username: user.name }
}

// exports
module.exports = {
  handleUserRegister,
  handleUserLogin
}