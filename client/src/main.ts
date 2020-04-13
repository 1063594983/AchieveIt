import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
import store, { commonStore } from '@/store';
import 'normalize.css';
import './assets/css/main.scss';
import 'nprogress/nprogress.css';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete
import './theme/element-ui';
import '../vendor/basscss.css';
import VueCompositionApi from '@vue/composition-api';

const loadTheme = async () => {
  if (commonStore.isDarkMode) {
    // @ts-ignore
    await import('element-theme-dark');
    // @ts-ignore
    await import('./assets/css/darkMode.scss');
  }
};

// 改为false，则若用户没有对应权限就看不到部分页面了
export const showAllPageWithoutAuth = false;

Vue.use(VueCompositionApi);

loadTheme().then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
