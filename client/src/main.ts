import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import setupTheme from '@/theme';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete

setupTheme();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
