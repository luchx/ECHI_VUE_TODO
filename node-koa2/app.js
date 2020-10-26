const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const {
  secret,
  errorHandle,
  whiteList
} = require("./helper/jwt");

// jwt
app.use(errorHandle)
  .use(jwtKoa({
    secret
  }).unless({
    path: whiteList
  }))

// error handler
onerror(app)

app.use(koaBody({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

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

app.use(Index.routes(), Index.allowedMethods())
app.use(Users.routes(), Users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app