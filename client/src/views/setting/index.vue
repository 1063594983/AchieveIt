<template>
  <div>
    <el-form label-width="300px" label-position="left">
      <h1>设置</h1>
      <el-form-item label="夜间模式">
        <el-switch v-model="darkMode"></el-switch>
      </el-form-item>
      <el-form-item label="显示欢迎界面">
        <el-switch v-model="showHello"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore } from '@/store';
import { Notify } from '@/theme';

@Component
export default class UISetting extends Vue {
  get darkMode() {
    return commonStore.isDarkMode;
  }
  set darkMode(val: boolean) {
    Notify.success('成功切换为' + (val ? '黑暗模式' : '日间模式'), '刷新页面查看效果');
    commonStore.setDarkMode(val);
  }
  get showHello() {
    return commonStore.showHello;
  }
  set showHello(val: boolean) {
    if (!val) {
      Notify.info('下次访问时会自动跳转到主页');
    }
    commonStore.setShowHello(val);
  }
}
</script>

<style scoped></style>
