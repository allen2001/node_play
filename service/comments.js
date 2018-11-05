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

// 回复评论
const handleCommentReply = async (content, username, cid) => {
  // 根据用户名去获取用户信息
  let user = await User.findAll({
    where: { username }
  })
  if (user.length === 0) { 
    return { err: true, message: '账号有误, 请重新登录' }
  }
  user = user[0]
  // 根据评论id获取当前评论对象
  let comment =  await Comment.findAll({
    where: {
      id: cid
    }
  })
  if (comment.length === 0) { 
    return { err: true, message: '当前评论已不存在' }
  }
  comment = comment[0]
  // 添加回复
  var now = Date.now()
  let reply = {
    id: 'reply-' + now,
    createdAt: now,
    updatedAt: now,
    version: 0,
    cid,
    content,
    username: user.name,
    userid: user.id,
    avatar: user.avatar
  }
  // console.log('检查类型: ' + typeof comment.replyArr)
  comment.replyArr.push(reply)
  comment.replyArr = Object.assign([], comment.replyArr)
  // 更新
  let c = await comment.save()
  return reply
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
  handleGetCommentList,
  handleCommentReply
}