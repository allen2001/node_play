// 用户信息model

const Sequelize = require('sequelize')
const db = require('../db')

// 对外暴露model模型
module.exports = db.defineModel('users', {
  username: {
    type: Sequelize.STRING(50),
    unique: true
  },
  passwd: Sequelize.STRING(50),
  name: Sequelize.STRING(50),
  gender: Sequelize.BOOLEAN,
  avatar: {
    type: Sequelize.STRING(100),
    allowNull: true
  }
})