import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/views/Layout.vue';
import store, { commonStore, userStore } from '@/store';
import NProgress from 'nprogress';
import _ from 'lodash';
import { showAllPageWithoutAuth } from '@/main';

Vue.use(VueRouter);

const menu: RouteConfig[] = [
  {
    name: 'home',
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      icon: 's-home',
      title: '首页',
    },
    children: [
      {
        name: 'home.index',
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          icon: 'user',
          title: '我的信息',
        },
      },
    ],
  },
  {
    name: 'projects',
    path: '/projects',
    component: Layout,
    redirect: '/projects/index',
    meta: {
      icon: 'menu',
      title: '项目中心',
    },
    children: [
      {
        name: 'projects.index',
        path: 'index',
        component: () => import('@/views/projects/index.vue'),
        meta: {
          icon: 'set-up',
          title: '项目管理',
          auth: '项目经理, EPG Leader, QA Manager'
        },
      },
      {
        name: 'projects.myProject',
        path: 'myProject',
        component: () => import('@/views/projects/myProject.vue'),
        meta: {
          icon: 'file',
          title: '我的项目',
          auth: '普通员工'
        },
      },
      {
        name: 'projects.review',
        path: 'review',
        component: () => import('@/views/projects/review.vue'),
        meta: {
          icon: 'receiving',
          title: '项目审核',
          auth: '项目上级', // 只有当前用户job为项目上级时，才能看到该页面
        },
      },
      {
        name: 'projects.defect',
        path: 'defect',
        component: () => import('@/views/projects/defect.vue'),
        meta: {
          icon: 'odometer',
          title: '缺陷管理',
        },
      },
      {
        name: 'projects.people',
        path: 'people',
        component: () => import('@/views/projects/people.vue'),
        meta: {
          icon: 'user',
          title: '人员管理',
          auth: '项目经理'
        }
      },
      {
        name: 'projects.devices',
        path: 'devices',
        component: () => import('@/views/projects/devices.tsx'),
        meta: {
          icon: 'mobile-phone',
          title: '设备管理',
        },
      },
      {
        name: 'projects.feature',
        path: 'feature',
        component: () => import('@/views/projects/feature.vue'),
        meta: {
          icon: 'magic-stick',
          title: '项目功能'
        },
      },
      {
        name: 'projects.config',
        path: 'config',
        component: () => import('@/views/projects/config.vue'),
        meta: {
          icon: 'reading',
          title: '配置管理',
        },
      },
      {
        name: 'projects.activity',
        path: 'activity',
        component: () => import('@/views/projects/activity.vue'),
        meta: {
          icon: 'time',
          title: '活动中心',
        },
      },
      {
        name: 'projects.risk',
        path: 'risk',
        component: () => import('@/views/projects/risk.vue'),
        meta: {
          icon: 'aim',
          title: '风险管理',
        },
      },
    ],
  },
  {
    name: 'human',
    path: '/human',
    component: Layout,
    redirect: '/human/index',
    meta: {
      icon: 'coordinate',
      title: '人事信息',
    },
    children: [
      {
        name: 'human.index',
        path: 'index',
        component: () => import('@/views/human/index.vue'),
        meta: {
          icon: 'alarm-clock',
          title: '工时管理',
        },
      },
    ],
  },
  {
    name: 'setting',
    path: '/setting',
    component: Layout,
    redirect: '/setting/index',
    meta: {
      icon: 'setting',
      title: '首选项',
    },
    children: [
      {
        name: 'setting.index',
        path: 'index',
        component: () => import('@/views/setting/index.vue'),
        meta: {
          icon: 'sunny',
          title: '界面设置',
        },
      },
    ],
  },
];

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      noAuth: true,
    },
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    name: 'Hello',
    meta: {
      noAuth: true,
    },
    component: () => import('@/views/hello/Hello.vue'),
  },
  ...menu,
  {
    path: '/403',
    name: 'NoAuth',
    meta: {
      noAuth: true,
    },
    component: () => import('@/views/403.vue'),
  },
  {
    path: '*',
    name: '404',
    meta: {
      noAuth: true,
    },
    component: () => import('@/views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const isAuthed = (i) => showAllPageWithoutAuth || !i.meta?.auth || i.meta?.auth?.includes(userStore.member.job);

router.beforeEach(async (to, from, next) => {
  // 与vuex-persist兼容使用，保证状态已经完全存储了
  // @ts-ignore
  await store.restored;

  // 如果设置了“跳过欢迎界面”，则直接跳转到主页
  if (to.matched.some((page) => page.name === 'Hello') && !commonStore.showHello) {
    next({ name: 'home' });
  }

  // 若用户已经登录，则除了权限不足的页面均可以访问
  if (userStore.isAuth) {
    if (to.matched.some((page) => !isAuthed(page))) {
      next({ name: 'NoAuth' });
    } else {
      NProgress.start();
      next();
    }
  }

  // 若用户未登录，则除了部分页面，都会跳转到Login
  else {
    if (to.matched.some((page) => page.meta.noAuth)) {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export function filterMenu(menu) {
  return menu.filter(isAuthed);
}

function getFlatMenu() {
  return _.flatMap(menu, (i) =>
    i.children.filter(isAuthed).map((child) => ({
      title: child.meta.title!,
      icon: child.meta.icon!,
      fatherTitle: i.meta.title!,
      name: child.name!,
      auth: child.meta.auth,
    }))
  );
}

export { menu, getFlatMenu };
export default router;
