<template>
  <div class="container">
    <header>
      <el-menu mode="horizontal" router :default-active="path">
        <router-link to="/" tag="div" class="brand"><p>AchieveIt</p></router-link>
        <el-menu-item index="/home">主页</el-menu-item>
        <el-menu-item index="/projects">项目中心</el-menu-item>
        <el-menu-item index="/activity">活动中心</el-menu-item>
        <el-menu-item index="/defects">缺陷管理</el-menu-item>
        <el-menu-item index="/risk">风险管理</el-menu-item>
        <el-menu-item index="/devices">设备管理</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
        <div class="user-container">
          <el-dropdown v-if="user" @command="handleCommand" trigger="click">
            <span class="dropdown-link">
              <el-avatar shape="square"></el-avatar>
              <el-icon name="arrow-down"></el-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>偏好设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-else @click="handleLogin">登录</el-button>
        </div>
      </el-menu>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore } from '@/store';

@Component
export default class Layout extends Vue {
  get path() {
    return this.$route.path;
  }
  get user() {
    return commonStore.currentUser;
  }

  handleLogin() {
    this.$router.push('/login');
  }

  handleCommand(command: string) {
    switch (command) {
      case 'logout': {
        commonStore.logout();
        this.handleLogin();
        return;
      }
      default: {
        return;
      }
    }
  }

  mounted() {
    this.$message.success({ offset: 80, message: 'v0.0.0.1 更新了大部分API的调用', duration: 3000 });
  }
}
</script>

<style scoped lang="scss">
.container {
  min-width: 1000px;
}
.user-container {
  float: right;
  height: 60px;
  display: flex;
  align-items: center;
}
.dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  i {
    margin-left: 0.75rem;
  }
}
.brand {
  float: left;
  font-size: 1.5rem;
  font-weight: bolder;
  font-family: Menlo, monospace;
  margin-right: 4rem;
  cursor: pointer;
  transition: 300ms;
  background-color: #409eff;
  padding: 0 20px;
  > p {
    color: white;
    height: 60px;
    display: table-cell;
    vertical-align: middle;
    margin: 0;
  }
}
header {
  padding: 0 0.75rem 0 0;
  box-shadow: 0 1px 18px -4px rgba(0, 0, 0, 0.15);
}

main {
  padding: 1rem;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
