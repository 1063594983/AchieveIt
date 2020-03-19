import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/layout/Layout.vue';
import store, { commonStore } from '@/store';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Hello',
    component: () => import(/* webpackChunkName: "Hello" */ '@/views/hello/Hello.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/home/Home.vue')
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/projectCenter/Projects.vue')
      },
      {
        path: '/defects',
        name: 'Defects',
        component: () => import(/* webpackChunkName: "Defects" */ '@/views/defectCenter/Defects.vue')
      },
      {
        path: '/devices',
        name: 'Devices',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/deviceCenter/Devices.vue')
      },

      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // 与vuex-persist兼容使用，保证状态已经完全存储了
  await (store as any).restored;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!commonStore.isAuth) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
