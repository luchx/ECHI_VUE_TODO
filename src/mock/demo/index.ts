// 更多示例请查看 http://mockjs.com/examples.html

export default {
  // 默认为 get 请求
  "/test1": () => {
    return {
      code: 0,
      data: {}
    };
  },
  // 可以添加请求方式
  "GET /test2": {
    code: 0,
    data: []
  },
  "POST /test3": {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|1-10": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1
      }
    ]
  }
};
