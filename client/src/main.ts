import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import 'normalize.css';
import './assets/main.scss';
import 'nprogress/nprogress.css';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete
import './element-ui';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
