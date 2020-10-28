const router = require("koa-router")();
const UserController = require("../controller/user");

router.prefix("/api/user");

router.post("/login", UserController.login);
router.get("/verify", UserController.verify);
router.get("/detail/:id", UserController.detail);

module.exports = router;
