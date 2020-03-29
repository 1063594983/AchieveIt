<template>
  <div>
    <h1>风险管理</h1>
    <pre>{{ riskDetail }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';

@Component
export default class Risk extends Vue {
  riskDetail = 'loading...';
  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.risk.get(4, { token: user.token });
    this.riskDetail = JSON.stringify(result, null, 2);
    console.log(result);
  }
}
</script>

<style scoped></style>
