import Img403 from "/@/assets/image/403.svg";
import Img404 from "/@/assets/image/404.svg";
import Img500 from "/@/assets/image/500.svg";

const config = {
  403: {
    img: Img403,
    title: "拒绝访问",
    desc: "抱歉，你无权访问该页面"
  },
  404: {
    img: Img404,
    title: "请求超时",
    desc: "抱歉，你访问的页面不存在"
  },
  500: {
    img: Img500,
    title: "请求出错",
    desc: "抱歉，服务器出错了"
  }
};

export default config;
