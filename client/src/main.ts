import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import 'vue-class-component/hooks'; // import hooks type to enable auto-complete
import { Row, Col, Button, Input, Menu, MenuItem, Container, Form, FormItem, Card } from 'element-ui';
[Row, Col, Button, Input, Menu, MenuItem, Container, Form, FormItem, Card].forEach(i => Vue.use(i));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
