<template>
  <div>
    <code>GET: /demo/hello ~~~ {{ demo }}</code>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { demoStore } from '@/store';
import agent from '@/agent';

@Component
export default class Main extends Vue {
  get demo() {
    return demoStore.demo;
  }
  mounted() {
    if (this.demo) return;
    agent.demo.getHello().then(result => {
      demoStore.modifyDemo(result.project);
    });
  }
}
</script>

<style scoped></style>
