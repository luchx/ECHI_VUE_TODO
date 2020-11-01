
/**
 * 获取时间戳
 */
async function getTimes(ctx) {
  const time = +new Date();
  ctx.success("获取成功", time)
}

module.exports = {
  getTimes
};