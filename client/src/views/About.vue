<template>
  <div>
    <h1>about</h1>
    <el-input v-model="name" splaceholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      name: ''
    };
  }
};
</script>

<style scoped></style>
