// 商品信息model
const Sequelize = require('sequelize')
const db = require('../db')

// 对外暴露model模型
module.exports = db.defineModel('prods', {
  name: Sequelize.STRING(50),
  brand: Sequelize.STRING(50),
  price: Sequelize.STRING(50),
  desc: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  avatar: {
    type: Sequelize.STRING(100),
    allowNull: true
  }
})