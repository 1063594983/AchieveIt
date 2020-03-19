import Vue from 'vue';
import 'normalize.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default function setupTheme() {
  Vue.use(Element);
  // 暂时不考虑按需引入
}
