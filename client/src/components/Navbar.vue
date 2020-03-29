<template>
  <div class="container">
    <div class="left-container">
      <div class="brand" v-once>
        <img v-if="!isDark" src="../assets/logo.svg" alt="logo" />
        <img v-else src="../assets/logo-dark.svg" alt="logo" />
      </div>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-container">
      <navbar-search></navbar-search>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="dropdown-link">
          <img src="../assets/profile.jpg" alt="avatar" />
          <el-icon name="arrow-down"></el-icon>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>偏好设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore, commonStore } from '@/store';
import Breadcrumb from '@/components/Breadcrumb.vue';
import NavbarSearch from '@/components/NavbarSearch.vue';

@Component({
  components: { NavbarSearch, Breadcrumb }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-container {
  display: flex;
  align-items: center;

  & > .brand {
    width: 220px;
    img {
      height: 35px;
    }
  }
}
.right-container {
  display: flex;
  justify-content: flex-end;
  .dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    i {
      margin-left: 0.75rem;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 4px;
    }
  }
}
</style>
