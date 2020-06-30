import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    redirect: '/todo'
  },
  {
    path: "/todo",
    name: "Todo",
    component: () => import(/* webpackChunkName: "todo" */ "@/views/todo")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
