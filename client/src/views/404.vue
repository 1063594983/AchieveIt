<template>
  <div class="container">
    <div class="not-found">页面丢失了，<router-link to="/" class="back">返回</router-link>上层</div>
  </div>
</template>

<script>
export default {
  name: 'notFound'
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
  text-decoration: none;
  color: black;
  border-bottom: 0.2rem solid black;
}

.back:hover {
  color: white;
  background-color: black;
}
</style>
