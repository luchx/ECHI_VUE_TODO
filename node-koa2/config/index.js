
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
}

module.exports = config;