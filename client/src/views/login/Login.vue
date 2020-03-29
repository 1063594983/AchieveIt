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
import { userStore } from '@/store';
import { Notify } from '@/theme';
import agent from '@/agent';

@Component
export default class Login extends Vue {
  username = '1';
  password = '1';
  isLoggingIn = false;

  handleBack() {
    this.$router.push('/');
  }

  async handleLogin() {
    this.isLoggingIn = true;
    try {
      const result = await agent.user.login({ username: this.username, password: this.password });
      Notify.success(result.msg, `欢迎回来 ${this.username}！`);
      userStore.login({ username: this.username, token: result.token!, member_id: result.member_id! });
      await this.$router.push('/home');
    } catch (e) {
      Notify.error('服务器发生错误啦');
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
