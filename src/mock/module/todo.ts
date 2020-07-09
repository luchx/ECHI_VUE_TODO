export default {
  // 默认为 get 请求
  "/getTodoList": () => {
    return {
      code: 0,
      data: {
        pagination: {
          page: 1,
          pageSize: 10,
          total: 23
        },
        "list|5-11": [
          {
            "id|+1": 1,
            title: "@ctitle",
            description: "@cparagraph(10, 20)",
            date: "@datetime",
            "status|1": [1, 2, 3],
            "isFinished|1": function() {
              return this["status"] === 1;
            }
          }
        ]
      }
    };
  }
};
