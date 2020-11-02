const router = require("koa-router")();
const UserController = require("../controller/user");
const { verifyToken } = require("../helper/jwt");

router.prefix("/api/user");

router.post("/login", UserController.login);
router.get("/verify", UserController.verify);
router.get("/detail/:id", verifyToken, UserController.detail);

module.exports = router;
