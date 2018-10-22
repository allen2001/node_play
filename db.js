// 统一Model的定义
const Sequelize = require('sequelize')
const config = require('./config')

// 创建一个sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

// 定义主键id的类型
const ID_TYPE = Sequelize.STRING(50)

// 强制实现统一的规则
function defineModel(name, attributes) {
  let attrs = {}
  // 给每个自定义业务字段加上相关属性规则(NOT NULL)
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }
  // 设置默认的属性规则
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  // 返回model模型
  return sequelize.define(name, attrs, {
    timestamps: false,
    tableName: name,
    hooks: {
      // Sequelize在创建、修改Entity时会调用我们指定的函数
      beforeValidate (obj) {
        console.log('BeforeValidate!!!: ' + JSON.stringify(obj))
        let now = Date.now()
        if (obj.isNewRecord) {  // 初次创建
          if (!obj.id) {
            obj.id = 'id-' + now
          }
          obj.createdAt = now
          obj.updatedAt = now
          obj.version = 0
        } else { // 更新
          console.log('Update!!!')
          obj.updatedAt = now
          obj.version++
        }
      }
    }
  })
}

// exports
module.exports = {
  defineModel,
  sync () {
    if (process.env.NODE_ENV !== 'production') {
      return sequelize.sync({ force: true })  // 自动创建数据库
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
    }
  }
}