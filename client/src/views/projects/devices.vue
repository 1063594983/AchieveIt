<template>
  <div>
    <h1>设备管理</h1>
    <pre>{{ deviceProject }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore } from '@/store';
import agent from '@/agent';

@Component
export default class Devices extends Vue {
  deviceProject: string = 'loading...';
  async mounted() {
    const user = commonStore.currentUser!;
    const result = await agent.device.get(1, { token: user.token });
    this.deviceProject = JSON.stringify(result, null, 2);
    console.log(result);
  }
}
</script>

<style scoped></style>
