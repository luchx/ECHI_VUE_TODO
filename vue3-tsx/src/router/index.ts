import { RouteRecordRaw, createRouter, Router, createWebHashHistory } from 'vue-router';
import { local } from '/@/utils/storage';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: {
      name: "Todo"
    }
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      level: 0
    },
    component: () => import("/@/views/Login")
  },
  {
    path: "/todo",
    name: "Todo",
    meta: {
      title: "待办",
      level: 0
    },
    component: () => import("/@/views/Todo")
  },
  {
    path: "/todo-detail",
    name: "TodoDetail",
    meta: {
      title: "待办详情",
      level: 1
    },
    component: () => import("/@/views/TodoDetail")
  },
  {
    path: "/todo-detail-view/:id",
    name: "TodoDetailView",
    meta: {
      title: "待办详情",
      level: 1
    },
    component: () => import("/@/views/TodoDetailView")
  },
  {
    path: "/date",
    name: "Date",
    meta: {
      title: "日程",
      level: 0
    },
    component: () => import("/@/views/Date")
  },
  {
    path: "/review",
    name: "Review",
    meta: {
      title: "本周回顾",
      level: 0
    },
    component: () => import("/@/views/Review")
  },
  {
    path: "/finished",
    name: "Finished",
    meta: {
      title: "历史事项",
      level: 0
    },
    component: () => import("/@/views/Finished")
  },
  {
    path: "/recycle",
    name: "Recycle",
    meta: {
      title: "回收站",
      level: 0
    },
    component: () => import("/@/views/Recycle")
  },
  {
    path: "/exception/403",
    name: "403",
    meta: {
      title: "403",
      level: 1
    },
    component: () => import("/@/views/Exception/403")
  },
  {
    path: "/exception/404",
    name: "404",
    meta: {
      title: "404",
      level: 1
    },
    component: () => import("/@/views/Exception/404")
  },
  {
    path: "/exception/500",
    name: "500",
    meta: {
      title: "500",
      level: 1
    },
    component: () => import("/@/views/Exception/500")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "404"
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 不需要校验路由，防止死循环
  const whiteList: string[] = [
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

router.afterEach((to, from) => {
  const toDepth = to.meta.level || 0;
  const fromDepth = from.meta.level || 0;
  if (toDepth === fromDepth) {
    to.meta.transition = ""
  } else {
    to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }
})

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
