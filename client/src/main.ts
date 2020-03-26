import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import 'normalize.css';
import './assets/main.scss';
import Element from 'element-ui';
// 暂时不考虑按需引入
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete

Vue.use(Element);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
