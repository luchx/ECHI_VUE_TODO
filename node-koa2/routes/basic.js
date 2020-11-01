const router = require("koa-router")();
const BasicController = require("../controller/basic");

router.prefix("/api/basic");

router.get("/getTimes", BasicController.getTimes);

module.exports = router;
