export default {
  // 默认为 get 请求
  "/todo/getTodoList": () => {
    return {
      code: 0,
      timestamp: +new Date(),
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
            "isFinished|1": function () {
              return this["status"] === 1;
            },
            "priority|1": [1, 2, 3, 4]
          }
        ]
      }
    };
  },
  "/todo/getTodoDetail": () => {
    return {
      code: 0,
      timestamp: +new Date(),
      data: {
        "id|1-100": 1,
        title: "@ctitle",
        description: "@cparagraph(10, 20)",
        date: "@datetime",
        "status|1": [1, 2, 3],
        "isFinished|1": function () {
          return this["status"] === 1;
        },
        "priority|1": ["low", "middle", "height", "heightest"]
      }
    };
  },
  "/todo/getTodoListByDay": () => {
    return {
      code: 0,
      timestamp: +new Date(),
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
            "isFinished|1": function () {
              return this["status"] === 1;
            },
            "priority|1": [1, 2, 3, 4]
          }
        ]
      }
    };
  },
  "/todo/getTodoListByWeek": () => {
    return {
      code: 0,
      timestamp: +new Date(),
      data: {
        task: {
          "finished|5-10": 1,
          "total|5-10": 1,
          "rate|3-5": 0.5
        },
        "list|5-11": [
          {
            "id|+1": 1,
            title: "@ctitle",
            description: "@cparagraph(10, 20)",
            date: "@datetime",
            "status|1": [1, 2, 3],
            "isFinished|1": function () {
              return this["status"] === 1;
            },
            "priority|1": [1, 2, 3, 4]
          }
        ]
      }
    };
  }
};
