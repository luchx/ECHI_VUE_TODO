const router = require("koa-router")();
const TodoController = require("@controller/todo");
const authVerify = require("@middlewares/authVerify");

router.prefix("/api/todo");

router.get("/getDateList", authVerify, TodoController.getDateList);
router.get("/getList", authVerify, TodoController.getList);
router.post("/saveList", authVerify, TodoController.saveList);
router.get("/getDetail/:id", authVerify, TodoController.getDetail);
router.get("/getListByDay", authVerify, TodoController.getListByDay);
router.get("/getReviewList", authVerify, TodoController.getReviewList);
router.get("/getFinishedList", authVerify, TodoController.getFinishedList);
router.get("/getRecycleList", authVerify, TodoController.getRecycleList);
router.delete("/deleteTodo/:id", authVerify, TodoController.deleteTodo);
router.delete("/deleteToRecycle/:id", authVerify, TodoController.deleteToRecycle);
router.put("/restoreToRecycle/:id", authVerify, TodoController.restoreToRecycle);
router.put("/finishTodo", authVerify, TodoController.finishTodo);

module.exports = router;
