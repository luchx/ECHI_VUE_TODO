const router = require("koa-router")();
const UserController = require("../controller/user");

router.prefix("/user");

router.post("/login", UserController.login);

module.exports = router;
