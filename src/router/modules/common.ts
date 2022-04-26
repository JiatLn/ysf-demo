import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('@/pages/Store/index.vue'),
    meta: {
      title: '商城',
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/pages/Category/index.vue'),
    meta: {
      title: '分类',
    },
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: () => import('@/pages/ShoppingCart/index.vue'),
    meta: {
      title: '购物车',
    },
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: () => import('@/pages/UserCenter/index.vue'),
    meta: {
      title: '个人中心',
    },
  },
];

export default routes;
