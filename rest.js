// 封装rest api

// 封装rest请求
const restify = (prefix) => {
  // 默认前缀为'/api/'
  prefix = prefix || '/api/'

  return async (ctx, next) => {
    // 判断是否为rest api请求
    if (ctx.request.path.startsWith(prefix)) {
      ctx.rest = (data) => {
        // content-type
        ctx.response.type = 'application/json'
        // set Response body
        ctx.response.body = data
      }
      // 捕获接下来程序运行抛出的错误
      try {
        await next()
      } catch (err) {
        console.error(err)
        ctx.status = 400
        ctx.rest({
          code: err.code || 'internal:unknown_error',
          message: err.message || '服务器错误'
        })
      }
    } else {
      await next()
    }
  }
}

// 处理错误
const APIError = function (code, message) {
  this.code = code || 'internal:unknown_error'
  this.message = message || ''
}

module.exports = {
  restify,
  APIError
}