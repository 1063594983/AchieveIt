import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/views/Layout.vue';
import store, { commonStore } from '@/store';

Vue.use(VueRouter);

const menu: RouteConfig[] = [
  {
    name: 'home',
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      title: '首页'
    },
    children: [
      {
        name: 'home.index',
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    name: 'projects',
    path: '/projects',
    component: Layout,
    redirect: '/projects/index',
    meta: {
      title: '项目中心'
    },
    children: [
      {
        name: 'projects.index',
        path: 'index',
        component: () => import('@/views/projects/index.vue'),
        meta: {
          title: '项目管理'
        }
      },
      {
        name: 'projects.defect',
        path: 'defect',
        component: () => import('@/views/projects/defect.vue'),
        meta: {
          title: '缺陷管理'
        }
      },
      {
        name: 'projects.devices',
        path: 'devices',
        component: () => import('@/views/projects/devices.vue'),
        meta: {
          title: '设备管理'
        }
      },
      {
        name: 'projects.activity',
        path: 'activity',
        component: () => import('@/views/projects/activity.vue'),
        meta: {
          title: '活动中心'
        }
      },
      {
        name: 'projects.risk',
        path: 'risk',
        component: () => import('@/views/projects/risk.vue'),
        meta: {
          title: '风险管理'
        }
      }
    ]
  }
];

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      noAuth: true
    },
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Hello',
    meta: {
      noAuth: true
    },
    component: () => import('@/views/hello/Hello.vue')
  },
  ...menu,
  {
    path: '*',
    name: '404',
    meta: {
      noAuth: true
    },
    component: () => import('@/views/404.vue')
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
  if (to.matched.some(record => !record.meta.noAuth)) {
    if (!commonStore.isAuth) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  console.log(error);
});

export { menu };
export default router;
