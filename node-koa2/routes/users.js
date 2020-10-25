const router = require('koa-router')();
const { UserController } = require('../controller/user');

router.prefix('/users')

router.post('/login', async (ctx) => {
  // const params = ctx.params;

  // 创建管理员
  const admin = await UserController.create({
    email: "test123@gmail.com",
    password: "123456",
    nickname: "Echi"
  });

  // 返回结果
  ctx.response.status = 200;
  ctx.body = admin;
});

module.exports = router
