// 评价信息model

const Sequelize = require('sequelize')
const db = require('../db')

// 对外暴露model模型
module.exports = db.defineModel('comments', {
  pid: Sequelize.STRING(50),
  title: Sequelize.STRING(50),
  content: Sequelize.STRING(255),
  username: Sequelize.STRING(50),
  userid: Sequelize.STRING(50),
  avatar: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  // childEva: {
  //   type: Sequelize.JSON,
  //   defaultValue: []
  // }
})