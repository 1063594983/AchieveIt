<template>
  <el-drawer title="项目草稿箱" :visible.sync="visible" :before-close="onClose" direction="rtl" size="50%">
    <el-table :data="drafts">
      <el-table-column property="project_id" label="ID"></el-table-column>
      <el-table-column property="project_name" label="项目名"></el-table-column>
      <el-table-column property="client_info" label="客户主体"></el-table-column>
      <el-table-column align="right">
        <el-button size="mini" type="info" width="40px">编辑</el-button>
      </el-table-column>
      <el-table-column>
        <el-button size="mini" type="primary" width="40px">提交</el-button>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { projectStore } from '@/store';

@Component
export default class ProjectDraftBox extends Vue {
  @Prop() visible!: boolean;
  @Prop() onClose!: () => void;
  get drafts() {
    return projectStore.projectDrafts;
  }
}
</script>

<style scoped></style>
