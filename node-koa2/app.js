const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const cors = require('koa2-cors')
const context = require('./helper/context')
const {
  secret,
  errorHandle,
  whiteList
} = require("./helper/jwt");

// error handler
onerror(app)

app.use(
  cors({
    origin: "*",
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['x-requested-with', 'if-modified-since', 'Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

// jwt
app.use(errorHandle)
  .use(jwtKoa({
    secret
  }).unless({
    path: whiteList
  }))

app.use(koaBody({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 添加执行上下文参数
app.use(context)

app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
const Index = require('./routes/index')
const Users = require('./routes/users')
const Todo = require('./routes/todo')

app.use(Index.routes(), Index.allowedMethods())
app.use(Users.routes(), Users.allowedMethods())
app.use(Todo.routes(), Todo.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app