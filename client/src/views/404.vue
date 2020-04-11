<template>
  <div class="container">
    <div class="not-found">页面丢失了，<span @click="handleBack" class="back">返回</span>上层</div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  methods: {
    handleBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.not-found {
  font-size: 3rem;
  margin-top: 2rem;
  color: #9b9b9b;
}
.back {
  cursor: pointer;
  text-decoration: none;
  color: black;
  border-bottom: 0.2rem solid black;
}

.back:hover {
  color: white;
  background-color: black;
}
</style>
