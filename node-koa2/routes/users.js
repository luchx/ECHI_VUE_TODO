const router = require("koa-router")();
const UserController = require("../controller/user");

router.prefix("/api/user");

router.post("/login", UserController.login);
router.get("/getVerify", UserController.getVerify);

module.exports = router;
