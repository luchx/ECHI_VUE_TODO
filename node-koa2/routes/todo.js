const router = require("koa-router")();
const TodoController = require("../controller/todo");

router.prefix("/api/todo");

router.get("/getList", TodoController.getList);
router.post("/saveList", TodoController.saveList);
router.get("/getDetail/:id", TodoController.getDetail);
router.get("/getListByDay", TodoController.getListByDay);
router.get("/getReviewList", TodoController.getReviewList);
router.get("/getFinishedList", TodoController.getFinishedList);
router.get("/getRecycleList", TodoController.getRecycleList);
router.delete("/deleteTodo", TodoController.deleteTodo);
router.delete("/deleteToRecycle", TodoController.deleteToRecycle);
router.put("/rebackToRecycle", TodoController.rebackToRecycle);

module.exports = router;
