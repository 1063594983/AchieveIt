<template>
  <div class="container">
    <div v-if="!currentUser">
      <h1>让协作更加轻松</h1>
      <h2>使用内置的项目管理系统，工时管理系统来参与项目的开发……</h2>
      <el-button plain round @click="go('login')" v-if="!currentUser">登录</el-button>
    </div>
    <div v-else>
      <h1>Achieve It</h1>
      <h2>{{ currentUser.username }}，你好！</h2>
      <el-button plain round @click="go('home')">前往主页</el-button>
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

<style scoped lang="scss">
.container {
  padding: 100px;
  height: 100vh;
  background-color: #fafafa;
  h2 {
    font-weight: normal;
  }
}
</style>
