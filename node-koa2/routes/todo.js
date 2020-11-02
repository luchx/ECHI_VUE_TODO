const router = require("koa-router")();
const TodoController = require("../controller/todo");
const { verifyToken } = require("../helper/jwt");

router.prefix("/api/todo");

router.get("/getDateList", verifyToken, TodoController.getDateList);
router.get("/getList", verifyToken, TodoController.getList);
router.post("/saveList", verifyToken, TodoController.saveList);
router.get("/getDetail/:id", verifyToken, TodoController.getDetail);
router.get("/getListByDay", verifyToken, TodoController.getListByDay);
router.get("/getReviewList", verifyToken, TodoController.getReviewList);
router.get("/getFinishedList", verifyToken, TodoController.getFinishedList);
router.get("/getRecycleList", verifyToken, TodoController.getRecycleList);
router.delete("/deleteTodo/:id", verifyToken, TodoController.deleteTodo);
router.delete("/deleteToRecycle/:id", verifyToken, TodoController.deleteToRecycle);
router.put("/restoreToRecycle/:id", verifyToken, TodoController.restoreToRecycle);
router.put("/finishTodo", verifyToken, TodoController.finishTodo);

module.exports = router;
