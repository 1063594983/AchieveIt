<template>
  <el-row class="container" type="flex" align="middle">
    <el-col :span="18">
      <div class="left-container">
        <div class="brand">AchieveIt</div>
        <breadcrumb></breadcrumb>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="right-container">
        <el-input prefix-icon="el-icon-search" placeholder="搜索想要的功能"></el-input>
        <el-dropdown @command="handleCommand" trigger="click">
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
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore } from '@/store';
import Breadcrumb from '@/components/Breadcrumb.vue';

@Component({
  components: { Breadcrumb }
})
export default class Navbar extends Vue {
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
}
</script>

<style scoped lang="scss">
.container {
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.left-container {
  display: flex;
  align-items: center;

  & > .brand {
    width: 220px;
    font-weight: bold;
    font-size: 26px;
    color: #409eff;
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
  }

  & > .el-input {
    margin-right: 20px;
  }
}
</style>
