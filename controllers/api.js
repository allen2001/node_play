// 导入model模型

const { APIError } = require('../rest')
// 引入service
const { handleGetProdList, handleAddProd, handleRemoveProd, handleGetProd, handleModifyProd } = require('../service/products')

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
  let prod = await handleAddProd(prodName, prodBrand, prodPrice, prodDesc, prodAvatar)
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

// exports
module.exports = {
  'GET /api/products': getProdList,
  'GET /api/searchProd': getProd,
  'POST /api/addProd': addProd,
  'POST /api/removeProd/:id': removeProd,
  'POST /api/modifyProd/:id': modifyProd
}

// -------------------------------------------