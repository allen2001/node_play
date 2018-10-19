// 导入model模型

const { APIError } = require('../rest')
// 引入service
const { handleGetProdList, handleAddProd, handleRemoveProd, handleGetProd, handleModifyProd } = require('../service/products')

// 查找商品列表
const getProdList = async (ctx, next) => {
  let prodList = handleGetProdList()
  // rest res
  ctx.rest({ prodList })
}

// 查找指定的商品
const getProd = async (ctx, next) => {
  let id = ctx.query.id || ''
  if (id === '') {
    throw new APIError('error', '商品id参数有误')
  }
  let prod = handleGetProd(id)
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
  let prod = handleAddProd(prodName, prodBrand, prodPrice)
  // rest res
  ctx.rest(prod)
}

// 删除商品
const removeProd = async (ctx, next) => {
  console.log("待删除商品的id号: " + ctx.params.id)
  let pId = ctx.params.id
  let prod = handleRemoveProd(pId)
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
  let prod = handleModifyProd(pId, prodName, prodBrand, prodPrice)
  
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