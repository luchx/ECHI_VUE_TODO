
// 设置配置文件
const config = {
  // 启动端口
  port: 3000,

  // 数据库配置
  database: {
    dbName: 'todo_sql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },

  // jwt 校验
  secret: {
    secretKey: "toto_jwt",
    whiteList: [
      /^\/api\/user\/login/,
      /^\/api\/user\/verify/,
    ],
    expired: "4h",
  }
}

module.exports = config;