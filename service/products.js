// 处理商品相关的业务逻辑

// 导入model模型
// ...

// 获取商品实例
var id = 0

function initId() {
  id++
  return 'prod' + id
}

function Product(name, brand, price) {
  this.id = initId()
  this.name = name
  this.brand = brand
  this.price = price
}

// 模拟数据库
var prodList = [
  new Product('默认商品1', '无', '0'),
  new Product('默认商品2', '无', '0'),
  new Product('默认商品3', '无', '0')
]

// 查询商品
function searchProd(id) {
  let state = false
  let index = null
  for (let i = 0; i < prodList.length; i++) {
    if (id === prodList[i].id) {
      state = true
      index = i
      break
    }
  }
  return { state, index }
}

// exports
module.exports = {
  // 查询商品列表
  handleGetProdList () {
    return prodList
  },
  // 查找指定的商品
  handleGetProd (id) {
    let { state, index } = searchProd(id)
    if (state) {
      return prodList[index]
    } else {
      return null
    }
  },
  // 添加商品
  handleAddProd (name, brand, price) {
    brand = brand || '无'
    price = price || '0'
    let prod = new Product(name, brand, price)
    prodList.push(prod)
    return prod
  },
  // 删除商品
  handleRemoveProd (id) {
    // 查询是否有此商品
    let { state, index } = searchProd(id)
    if (state) {
      // 删除商品 并返回被删除的商品对象
      return prodList.splice(index, 1)[0]
    } else {
      return null
    }
  },
  // 修改商品
  handleModifyProd (id, name, brand, price) {
    // 查询商品是否存在
    let { state, index } = searchProd(id)
    if (state) {
      // 更新商品数据
      let target = prodList[index]
      target.name = name
      target.brand = brand
      target.price = price
      return target
    } else {  // 商品不存在
      return null
    }
  }
}