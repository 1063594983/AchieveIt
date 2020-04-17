<template>
  <div>
    <el-form label-width="300px" label-position="left">
      <h1>设置</h1>
      <el-form-item label="提示显示位置">
        <el-select v-model="notifyPosition">
          <el-option label="不显示" value="hide" />
          <el-option label="右下角" value="bottom-right" />
          <el-option label="左下角" value="bottom-left" />
          <el-option label="右上角" value="top-right" />
          <el-option label="左上角" value="top-left" />
        </el-select>
      </el-form-item>
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
  get notifyPosition() {
    return commonStore.notifyPosition;
  }
  set notifyPosition(val: string) {
    commonStore.setNotifyPosition(val);
    Notify.info('将提示位置更改为' + val);
  }
}
</script>

<style scoped></style>
