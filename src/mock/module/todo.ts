export default {
  "POST | /todo/saveTodoList": {
    code: 0,
    timestamp: +new Date(),
    result: true
  },
  "/todo/getTodoList": () => {
    return {
      code: 0,
      timestamp: +new Date(),
      result: {
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
            status: 1,
            isFinished: false,
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
      result: {
        "id|1-100": 1,
        title: "@ctitle",
        description: "@cparagraph(10, 20)",
        date: "@datetime",
        "status|1": [1, 2, 3],
        "isFinished|1": function () {
          return this["status"] === 2;
        },
        "priority|1": [1, 2, 3, 4]
      }
    };
  },
  "/todo/getTodoListByDay": () => {
    return {
      code: 0,
      timestamp: +new Date(),
      result: {
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
              return this["status"] === 2;
            },
            "priority|1": [1, 2, 3, 4]
          }
        ]
      }
    };
  },
  "/todo/getReviewTodoList": () => {
    return {
      code: 0,
      timestamp: +new Date(),
      result: {
        task: {
          "finishCount|5-10": 1,
          total: 10,
          "rate|1-5": 0.5
        },
        "list|5-11": [
          {
            "id|+1": 1,
            title: "@ctitle",
            description: "@cparagraph(10, 20)",
            date: "@datetime",
            status: 2,
            isFinished: true,
            "priority|1": [1, 2, 3, 4]
          }
        ]
      }
    };
  },
  "/todo/getFinishedTodoList": () => {
    return {
      code: 0,
      timestamp: +new Date(),
      result: {
        pagination: {
          page: 1,
          pageSize: 10,
          total: 23
        },
        list: [{
          date: "2020-06-05",
          "list|5-10": [
            {
              "id|+1": 1,
              title: "@ctitle",
              description: "@cparagraph(10, 20)",
              date: "2020-06-05",
              status: 2,
              isFinished: true,
              "priority|1": [1, 2, 3, 4]
            }
          ],
        },{
          date: "2020-07-15",
          "list|5-10": [
            {
              "id|+1": 1,
              title: "@ctitle",
              description: "@cparagraph(10, 20)",
              date: "2020-07-15",
              status: 2,
              isFinished: true,
              "priority|1": [1, 2, 3, 4]
            }
          ],
        }]
      }
    };
  },
  "/todo/getRecycleTodoList": {
    code: 0,
    timestamp: +new Date(),
    result: {
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
          status: 3,
          "isFinished|0-1": 1,
          "priority|1": [1, 2, 3, 4]
        }
      ]
    }
  }
};
