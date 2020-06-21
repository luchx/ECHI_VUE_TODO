import Vue from 'vue';
import Router, {
  RouteConfig,
} from 'vue-router';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'hello',
    component: () => import('@/view/hello/index.vue'),
    meta: {
      title: '第一个页面'
    }
  },
];

const router: Router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;