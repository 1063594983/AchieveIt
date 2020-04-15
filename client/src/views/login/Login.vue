<template>
  <div class="container">
    <el-card shadow="hover" class="login">
      <div slot="header">
        <el-button v-if="canGoHome" type="text" @click="handleBack"><el-icon name="back"></el-icon> 返回</el-button>
        <b v-else>登录</b>
      </div>
      <el-form v-model="form" label-position="left" label-width="4rem">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="isLoggingIn">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore, userStore } from '@/store';
import { Notify } from '@/theme';

@Component
export default class Login extends Vue {
  get canGoHome() {
    return commonStore.showHello;
  }
  form = {
    username: '',
    password: '',
  };
  isLoggingIn = false;

  handleBack() {
    this.$router.push('/');
  }

  async handleLogin() {
    this.isLoggingIn = true;
    try {
      await userStore.login(this.form);
      Notify.success('登陆成功', `欢迎回来 ${userStore.currentUser?.username}！`);
      await userStore.loadMember();
      await this.$router.push('/home');
    } catch (e) {
      Notify.error(e.response?.msg ?? '服务器发生错误啦');
    }
    this.isLoggingIn = false;
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.1); /*中间灰无敌*/
}
.login {
  width: 25rem;
}
.login .el-input {
  width: 18rem;
}
</style>
