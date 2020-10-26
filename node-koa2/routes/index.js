const router = require("koa-router")();
const IndexController = require("../controller/index");

router.get("/", IndexController.home);

module.exports = router;
