<template>
  <div class="container">
    <div v-if="!currentUser">
      <h1>让协作更加轻松</h1>
      <h2>使用内置的项目管理系统，工时管理系统来参与项目的开发……</h2>
      <el-button plain round @click="go('login')" v-if="!currentUser">登录</el-button>
    </div>
    <div v-else>
      <div class="logo">
        <span class="achieve">Achieve</span>
        <span class="it">It</span>
      </div>
      <h2>> 你好，{{ currentUser.username }}！</h2>
      <h2>> 请选择你的指令</h2>
      <h2>> <span class="link" @click="go('home')">前往主页</span></h2>
      <h2>> <span class="link" @click="logout">退出登录</span></h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { userStore } from '@/store';
@Component
export default class Hello extends Vue {
  go(path: string) {
    this.$router.push(path);
  }
  logout() {
    userStore.logout();
  }
  get currentUser() {
    return userStore.currentUser;
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 100px;
  height: 100vh;
  h2 {
    font-weight: normal;
  }
  .link {
    cursor: pointer;
    border-bottom: 2px solid rgb(128, 128, 128);
  }
  .logo {
    display: flex;
    font-size: 30px;
    font-weight: 500;
    align-items: center;
    font-family: Consolas, monospace;
    .achieve {
    }
    .it {
      margin-left: 10px;
      background-color: #00adff;
      padding: 4px 10px;
      border-radius: 3px;
      color: white;
    }
  }
}
</style>
