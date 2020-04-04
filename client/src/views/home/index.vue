<template>
  <div v-if="member">
    <div class="flex items-center p2 py3">
      <img alt="avatar" src="../../assets/img/profile.jpg" class="rounded" />
      <div class="pl2">
        <h2>三千焱炎火</h2>
        <div class="h3">{{ member.email }}</div>
        <el-tag type="info" class="mt1">{{ member.job }}</el-tag>

      </div>
    </div>

    <el-card shadow="never">
      <pre>{{ memberDetail }}</pre>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';
import { Member } from 'achieve-it-contract';

@Component
export default class Main extends Vue {
  member: Member | null = null;
  memberDetail = '';
  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.member.get(user.member_id, { token: user.token });
    this.member = result.member;
    this.memberDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped lang="scss"></style>
