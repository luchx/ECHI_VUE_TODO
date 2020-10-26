
/**
 * 首页控制器
 */
exports.home = async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
}