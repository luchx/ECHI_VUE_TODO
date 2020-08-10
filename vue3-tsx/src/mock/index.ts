import Mock from "mockjs";
// 更多示例请查看 http://mockjs.com/examples.html

// 模拟请求延时
Mock.setup({
  timeout: "200-1000"
});

const fetchList = [];


// const files = require.context(".", true, /\.ts$/);
// files.keys().forEach(key => {
//   if (key === "./index.ts") return;
//   Array.prototype.push.call(fetchList, files(key).default);
// });

// // 注册所有的mock服务
// fetchList.forEach(item => {
//   for (const [path, target] of Object.entries(item)) {
//     let [method, url] = path.split(" ");
//     if (url === undefined) {
//       url = method;
//       method = "get";
//     }

//     Mock.mock(new RegExp(`^${url}`), method.toLowerCase(), Mock.mock(target));
//   }
// });

console.log("mock 挂载完成！");
