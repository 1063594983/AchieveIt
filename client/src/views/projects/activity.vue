<template>
  <div>
    <h1>活动中心</h1>
    <pre>{{ activityDetail }}</pre>
    <el-timeline :reverse="reverse">
      <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonStore } from '@/store';
import agent from '@/agent';

@Component
export default class Activity extends Vue {
  activityDetail: string = 'loading...';
  reverse = true;
  activities = [
    {
      content: '活动按期开始',
      timestamp: '2018-04-15'
    },
    {
      content: '通过审核',
      timestamp: '2018-04-13'
    },
    {
      content: '创建成功',
      timestamp: '2018-04-11'
    }
  ];
  async mounted() {
    const user = commonStore.currentUser!;
    const result = await agent.activity.get(2, { token: user.token });
    this.activityDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped></style>
