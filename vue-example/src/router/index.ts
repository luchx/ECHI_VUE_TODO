import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import { local } from "@/utils/storage";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "*",
    redirect: "/exception/404"
  },
  {
    path: "/",
    name: "Home",
    redirect: "/todo"
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login")
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
    path: "/todo-detail",
    name: "TodoDetail",
    meta: {
      title: "待办详情"
    },
    component: () =>
      import(/* webpackChunkName: "TodoDetail" */ "@/views/TodoDetail")
  },
  {
    path: "/todo-detail-view/:id",
    name: "TodoDetailView",
    meta: {
      title: "待办详情"
    },
    component: () =>
      import(/* webpackChunkName: "TodoDetailView" */ "@/views/TodoDetailView")
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
  },
  {
    path: "/finished",
    name: "Finished",
    meta: {
      title: "历史事项"
    },
    component: () =>
      import(/* webpackChunkName: "Finished" */ "@/views/Finished")
  },
  {
    path: "/recycle",
    name: "Recycle",
    meta: {
      title: "回收站"
    },
    component: () => import(/* webpackChunkName: "Recycle" */ "@/views/Recycle")
  },
  {
    path: "/exception/403",
    name: "403",
    meta: {
      title: "403"
    },
    component: () =>
      import(/* webpackChunkName: "Exception" */ "@/views/Exception/403")
  },
  {
    path: "/exception/404",
    name: "404",
    meta: {
      title: "404"
    },
    component: () =>
      import(/* webpackChunkName: "Exception" */ "@/views/Exception/404")
  },
  {
    path: "/exception/500",
    name: "500",
    meta: {
      title: "500"
    },
    component: () =>
      import(/* webpackChunkName: "Exception" */ "@/views/Exception/500")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: Route, next) => {
  // 不需要校验路由，防止死循环
  const whiteList: (string | null | undefined)[] = [
    "403",
    "404",
    "500",
    "Login"
  ];
  if (whiteList.includes(to.name)) return next();

  // 判断是否需要权限认证
  const token = local.get("token");
  if (!token) {
    return next("/login");
  }

  next();
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
