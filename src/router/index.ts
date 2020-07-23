import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: import('../views/Home'),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
