<template>
  <div>
    <el-form>
      <el-form-item label="夜间模式">
        <el-switch v-model="darkMode"></el-switch>
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
}
</script>

<style scoped></style>
