// 导入model模型

const { APIError } = require('../rest')
// 引入service
const { handleGetProdList, handleAddProd, handleRemoveProd, handleGetProd, handleModifyProd } = require('../service/products')
const { handleCommentProd, handleGetCommentList, handleCommentReply } = require('../service/comments')

// 查找商品列表
const getProdList = async (ctx, next) => {
  let page = ctx.query.page || 1
  let keyword = ctx.query.keyword || ''
  let prodObj = await handleGetProdList(page, keyword)
  // rest res
  ctx.rest(prodObj)
}

// 查找指定的商品(by ID)
const getProd = async (ctx, next) => {
  let id = ctx.query.id || ''
  if (id === '') {
    throw new APIError('error', '商品id参数有误')
  }
  let prod = await handleGetProd(id)
  if (prod == null) {
    throw new APIError('error', '找不到此商品')
  }
  // rest res
  ctx.rest(prod)
}

// 添加商品
const addProd = async (ctx, next) => {
  // 获取对应的参数
  let prodName = ctx.request.body.name
  let prodBrand = ctx.request.body.brand
  let prodPrice = ctx.request.body.price
  let prodDesc = ctx.request.body.desc
  let prodAvatar = ctx.request.body.avatar
  let creater = ctx.cookies.get('username')
  if (creater) {
    creater = new Buffer(creater, 'base64').toString()
  }
  let prod = await handleAddProd(prodName, prodBrand, prodPrice, prodDesc, prodAvatar, creater)
  // rest res
  ctx.rest(prod)
}

// 删除商品
const removeProd = async (ctx, next) => {
  console.log("待删除商品的id号: " + ctx.params.id)
  let pId = ctx.params.id
  let prod = await handleRemoveProd(pId)
  if (prod == null) {
    throw new APIError('error', '找不到此商品')
  }
  // rest res
  ctx.rest(prod)
}

// 修改商品
const modifyProd = async (ctx, next) => {
  console.log("待修改商品的id号: " + ctx.params.id)
  let pId = ctx.params.id
  if (!pId)  {
    throw new APIError('error', '商品id参数有误')
  }
  let prodName = ctx.request.body.name
  let prodBrand = ctx.request.body.brand
  let prodPrice = ctx.request.body.price
  let prodDesc = ctx.request.body.desc
  let prodAvatar = ctx.request.body.avatar
  let prod = await handleModifyProd(pId, prodName, prodBrand, prodPrice, prodDesc, prodAvatar)
  // console.log(JSON.stringify(prod))
  if (prod == null) {
    throw new APIError('error', '找不到此商品')
  }
  // rest res
  ctx.rest(prod)
}

// 获取评论列表
const getCommentList = async (ctx, next) => {
  let pid = ctx.query.pid
  let list = await handleGetCommentList(pid)
  // rest res
  ctx.rest(list)
}

// 发布评论(新)
const commentProd = async (ctx, next) => {
  let pid = ctx.request.body.pid
  let title = ctx.request.body.title
  let content = ctx.request.body.content
  let username = ctx.cookies.get('username')
  if (!username) {
    throw new APIError('error', '请先登录!')
  }
  // 通过cookie获取的用户名 base64转到字符串
  username = new Buffer(username, 'base64').toString()
  let comment = await handleCommentProd(title, content, username, pid)
  if (comment.err) {
    throw new APIError('error', comment.message)
  }
  // rest res
  ctx.rest(comment)
}

// 回复评论
const commentReply = async (ctx, next) => {
  let cid = ctx.request.body.cid
  let content = ctx.request.body.content
  let username = ctx.cookies.get('username')
  if (!username) {
    throw new APIError('error', '请先登录!')
  }
  // 通过cookie获取的用户名 base64转到字符串
  username = new Buffer(username, 'base64').toString()
  let reply = await handleCommentReply(content, username, cid)
  if (reply.err) {
    throw new APIError('error', reply.message)
  }
  // rest res
  ctx.rest(reply)
}

// exports
module.exports = {
  'GET /api/products': getProdList,
  'GET /api/searchProd': getProd,
  'POST /api/addProd': addProd,
  'POST /api/removeProd/:id': removeProd,
  'POST /api/modifyProd/:id': modifyProd,
  'POST /api/comment': commentProd,
  'POST /api/reply': commentReply,
  'GET /api/getCommentList': getCommentList
}

// -------------------------------------------