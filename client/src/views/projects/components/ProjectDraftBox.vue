<template>
  <el-drawer title="项目草稿箱" :visible.sync="visible" :before-close="onClose" direction="rtl" size="70%">
    <el-table :data="drafts">
      <el-table-column property="project_id" label="ID"></el-table-column>
      <el-table-column property="project_name" label="项目名"></el-table-column>
      <el-table-column property="client_info" label="客户主体"></el-table-column>
      <el-table-column align="right" width="220px">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="editProject(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="createProject(scope.row)">提交</el-button>
          <el-button size="mini" type="danger" @click="deleteProject(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { projectStore } from '@/store';
import { ProjectDraft } from '@/store/project.module';

@Component
export default class ProjectDraftBox extends Vue {
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;
  @Prop({ required: true }) onCreateProject!: (form: ProjectDraft) => boolean;
  @Prop({ required: true }) openProjectDialog!: () => void;

  editProject(form: ProjectDraft) {
    projectStore.setCurrentDraft(form);
    this.openProjectDialog();
  }
  createProject(form: ProjectDraft) {
    const result = this.onCreateProject(form);
    if (result) this.onClose();
  }
  deleteProject(form: ProjectDraft) {
    projectStore.removeProjectDraft(form);
  }
  get drafts() {
    return projectStore.projectDrafts;
  }
}
</script>

<style scoped></style>
