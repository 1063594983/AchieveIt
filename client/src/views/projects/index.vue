<template>
  <div>
    <h1>项目管理</h1>
    <pre>{{ projectDetail }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';

@Component
export default class Projects extends Vue {
  projectDetail = 'loading...';
  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.project.get(123, { token: user.token });
    this.projectDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped></style>
