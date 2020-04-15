<template>
  <div class="container flex items-center justify-between">
    <div class="flex items-center">
      <div class="brand" v-once>
        <img v-if="!isDark" src="../assets/img/logo.svg" alt="logo" />
        <img v-else src="../assets/img/logo-dark.svg" alt="logo" />
      </div>
      <breadcrumb></breadcrumb>
    </div>
    <div class="flex items-center">
      <navbar-search></navbar-search>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="flex items-center cursor">
          <img src="../assets/img/profile.jpg" alt="avatar" class="rounded avatar" />
          <el-icon name="arrow-down" class="ml1"></el-icon>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore, userStore } from '@/store';
import Breadcrumb from '@/components/Breadcrumb.vue';
import NavbarSearch from '@/components/NavbarSearch.vue';

@Component({
  components: { NavbarSearch, Breadcrumb },
})
export default class Navbar extends Vue {
  get isDark() {
    return commonStore.isDarkMode;
  }
  get path() {
    return this.$route.path;
  }
  get user() {
    return userStore.currentUser;
  }

  handleLogin() {
    this.$router.push('/login');
  }

  handleCommand(command: string) {
    switch (command) {
      case 'logout': {
        userStore.logout();
        this.handleLogin();
        return;
      }
      default: {
        return;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
}

.brand {
  width: 220px;
  img {
    height: 35px;
  }
}

.avatar {
  width: 40px;
  height: 40px;
}
</style>
