<template>
  <div class="container">
    <el-card shadow="hover" class="login">
      <div slot="header">
        <el-button type="text" @click="handleBack"><el-icon name="back"></el-icon> 返回</el-button>
      </div>
      <el-form label-position="left" label-width="4rem">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" placeholder="输入密码"></el-input>
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
import { commonStore } from '@/store';

import agent from '@/agent';

@Component
export default class Login extends Vue {
  username: string = '';
  password: string = '';
  isLoggingIn: boolean = false;

  handleBack() {
    this.$router.push('/');
  }

  async handleLogin() {
    this.isLoggingIn = true;
    try {
      const result = await agent.user.login(this.username, this.password);
      this.$notify.success({
        title: result.msg,
        message: `欢迎回来 ${this.username}！`,
        position: 'bottom-left'
      });
      commonStore.login({ username: this.username, token: result.token, member_id: result.member_id });
      this.$router.push('/home');
    } catch (e) {
      this.$notify.error('服务器发生错误啦');
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
  background-color: #fafafa;
}
.login {
  width: 25rem;
}
.login .el-input {
  width: 18rem;
}
</style>
