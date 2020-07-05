import Vue from "vue";
import VueRouter from "vue-router";

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/todo"
  },
  {
    path: "/todo",
    name: "Todo",
    meta: {
      title: "待办"
    },
    component: () => import(/* webpackChunkName: "Todo" */ "@/views/Todo")
  },
  {
    path: "/todo-detail/:id",
    name: "TodoDetail",
    component: () =>
      import(/* webpackChunkName: "TodoDetail" */ "@/views/TodoDetail")
  },
  {
    path: "/date",
    name: "Date",
    meta: {
      title: "日程"
    },
    component: () => import(/* webpackChunkName: "Date" */ "@/views/Date")
  },
  {
    path: "/review",
    name: "Review",
    meta: {
      title: "本周回顾"
    },
    component: () => import(/* webpackChunkName: "Review" */ "@/views/Review")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement("iframe");
      hackIframe.style.display = "none";
      document.body.appendChild(hackIframe);
      setTimeout(() => {
        document.body.removeChild(hackIframe);
      }, 300);
    }
  }
});

export default router;
