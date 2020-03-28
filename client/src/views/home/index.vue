<template>
  <div>
    <h1>成员信息</h1>
    <pre>{{ memberDetail }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore } from '@/store';
import agent from '@/agent';

@Component
export default class Main extends Vue {
  memberDetail = 'loading...';
  async mounted() {
    const user = commonStore.currentUser!;
    const result = await agent.member.get(user.member_id, { token: user.token });
    this.memberDetail = JSON.stringify(result, null, 2);
    console.log(result);
  }
}
</script>

<style scoped></style>
