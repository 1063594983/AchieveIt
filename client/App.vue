<template>
  <div>
    <h1 v-show="!content">Loading..</h1>
    <div v-if="content">
      <h2>{{ content.project }}</h2>
      <ul>
        <li v-for="member in content.members">{{ member }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: null
    };
  },
  methods: {
    async hello() {
      try {
        const result = await fetch('/api');
        this.content = await result.json();
      } catch (e) {
        console.log('network err');
      }
    }
  },
  mounted() {
    this.hello();
  }
};
</script>

<style scoped></style>
