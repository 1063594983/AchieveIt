<template>
  <el-row>
    <el-col :span="3">
      <el-menu mode="vertical" router :default-active="$route.path">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
        <el-menu-item index="/login">登录</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="9" class="container">
      <router-view />
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PageLayout'
};
</script>

<style scoped></style>
