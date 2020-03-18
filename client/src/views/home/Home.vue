<template>
  <div>
    <code>GET: /demo/hello ~~~ {{ demo }}</code>
    <h1>{{ count }}</h1>
    <el-button @click="handleAdd">add</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonState } from '@/store';
import agent from '@/agent';

@Component
export default class Main extends Vue {
  get count() {
    return commonState.count;
  }
  get demo() {
    return commonState.demo;
  }

  handleAdd() {
    commonState.modifyCount(count => count + 1);
  }

  mounted() {
    if (this.demo) return;
    agent.demo.getHello().then(result => {
      commonState.modifyDemo(result);
    });
  }
}
</script>

<style scoped></style>
