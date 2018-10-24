// 处理商品相关的业务逻辑

// 导入model模型
const { Prod } = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 设置商品的业务信息
function Product(name, brand, price, desc) {
  this.name = name
  this.brand = brand
  this.price = price
  this.desc = desc
}

// 查询商品列表
async function searchProdList(page, keyword) {
  // 根据关键字进行模糊查询
  var keyword = keyword || ''
  let whereObj = {}
  if (keyword !== '') {
    whereObj = {
      [Op.or]: [
        {
          name: {
            [Op.like]:  '%' + keyword + '%'
          }
        },
        {
          brand: {
            [Op.like]:  '%' + keyword + '%'
          }
        },
        {
          price: {
            [Op.like]:  '%' + keyword + '%'
          }
        }
      ]
    }
  }
  // 获取数据总数
  let totalList = await Prod.findAll({
    where: whereObj
  })
  let total = totalList.length
  // 通过分页参数筛选数据
  let offset = (page - 1) * 10
  let prodList = await Prod.findAll({
    where: whereObj,
    limit: 10,
    offset,
    order: [
      ['updatedAt', 'DESC']
    ]
  })
  return {
    prodList,
    total
  }
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