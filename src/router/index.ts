import Vue from 'vue';
import Router, {
  RouteConfig,
} from 'vue-router';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/cart'
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/view/cart/index.vue'),
    meta: {
      title: '购物车'
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