// 处理商品相关的业务逻辑

// 导入model模型
const { Prod } = require('../model')

// 设置商品的业务信息
function Product(name, brand, price, desc) {
  this.name = name
  this.brand = brand
  this.price = price
  this.desc = desc
}

// 查询商品列表
async function searchProdList() {
  let prodList = await Prod.findAll()
  return prodList
}

// 查询商品 by ID
async function searchProd(id) {
  let state = false
  let index = null
  let list = await Prod.findAll({
    where: {
      id
    }
  })
  let prod = list[0]
  if (prod) {
    return prod
  } else {
    return null
  }
}

// exports
module.exports = {
  // 查询商品列表
  handleGetProdList: searchProdList,
  // 查找指定的商品
  handleGetProd: searchProd,
  // 添加商品
  async handleAddProd (name, brand, price, desc) {
    let prodData = new Product(name, brand, price, desc)
    let prod = await Prod.create(prodData)
    return prod
  },
  // 删除商品
  async handleRemoveProd (id) {
    // 查询是否有此商品
    let prod = await searchProd(id)
    if (prod) {
      // 删除商品 并返回被删除的商品对象
      return await prod.destroy()
    } else {
      return null
    }
  },
  // 修改商品
  async handleModifyProd (id, name, brand, price) {
    // 查询商品是否存在
    let prod = await searchProd(id)
    if (prod) {
      // 更新商品数据
      prod.name = name
      prod.brand = brand
      prod.price = price
      return await prod.save()
    } else {  // 商品不存在
      return null
    }
  }
}