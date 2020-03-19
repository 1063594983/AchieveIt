<template>
  <div>
    <h1>这是AchieveIt的主页</h1>
    <el-button round @click="go('login')" v-if="!currentUser">登录</el-button>
    <div v-else>
      <h3>{{ currentUser.username }} 你好！</h3>
      <el-button round @click="go('home')">前往主页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { commonStore } from '@/store';
@Component
export default class Hello extends Vue {
  go(path: string) {
    this.$router.push(path);
  }
  get currentUser() {
    return commonStore.currentUser;
  }
}
</script>

<style scoped></style>
