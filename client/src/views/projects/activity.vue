<template>
  <div>
    <h1>活动中心</h1>
    <pre>{{ activityDetail }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';

@Component
export default class Activity extends Vue {
  activityDetail = 'loading...';
  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.activity.get('2', { token: user.token });
    this.activityDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped></style>
