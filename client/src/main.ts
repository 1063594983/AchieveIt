import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store, { commonStore } from '@/store';
import 'normalize.css';
import './assets/css/main.scss';
import 'nprogress/nprogress.css';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete
import './theme/element-ui';

const loadTheme = async () => {
  if (commonStore.isDarkMode) {
    // @ts-ignore
    await import('element-theme-dark');
    // @ts-ignore
    await import('./assets/css/darkMode.scss');
  }
};

loadTheme().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
