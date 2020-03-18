import Vue from 'vue';
import App from './App.vue';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete
import router from './router';
import store from './store';
import { Button, Input } from 'element-ui';

[Button, Input].forEach(i => Vue.use(i));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
