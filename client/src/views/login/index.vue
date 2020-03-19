<template>
  <div class="container">
    <div class="login shadow-sm">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Login extends Vue {
  username: string = '';
  password: string = '';
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
  width: 20rem;
  background-color: white;
  padding: 2rem;
}
</style>
