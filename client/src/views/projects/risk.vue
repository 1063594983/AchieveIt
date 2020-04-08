<template>
  <div>
    <h1>风险管理 </h1>
    <el-table :data="riskList">
      <el-table-column label="ID" prop="risk_id" width="100px"></el-table-column>
      <el-table-column label="项目名称" prop="project_id"></el-table-column>
      <el-table-column label="内容" prop="detail"></el-table-column>
      <el-table-column label="处理状态" prop="solve_status"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import agent from '@/agent';
import { Risk } from 'achieve-it-contract';

@Component
export default class Risks extends Vue {
  riskList: Risk[] = [];
  async mounted() {
    const list = await agent.risk.ofProject(123);
    this.riskList = list.risk_list;

  }
}
</script>

<style scoped></style>
