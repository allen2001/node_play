// 导入model
const { Comment, User } = require('../model')

// 发表新评论
const handleCommentProd = async (title, content, username, pid) => {
  // 根据用户名去获取用户信息
  let user = await User.findAll({
    where: { username }
  })
  if (user.length === 0) { 
    return { err: true, message: '账号有误, 请重新登录' }
  }
  user = user[0]
  let comment = await Comment.create({
    pid,
    title,
    content,
    username: user.name,
    userid: user.id,
    avatar: user.avatar
  })
  return comment
}

// 获取评论列表
const handleGetCommentList = async (pid) => {
  let list = await Comment.findAll({
    where: { pid },
    order: [
      ['updatedAt', 'DESC']
    ]
  })
  return list
}

// exports
module.exports = {
  handleCommentProd,
  handleGetCommentList
}