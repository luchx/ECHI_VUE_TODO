import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: "Todo",
    meta: {
      title: "待办"
    },
    component: () => import("/@/views/Todo")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () => import("/@/views/Login")
  },
  {
    path: "/todo",
    name: "Todo",
    meta: {
      title: "待办"
    },
    component: () => import("/@/views/Todo")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
