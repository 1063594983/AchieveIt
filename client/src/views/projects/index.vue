<template>
  <div>
    <el-button icon="el-icon-document-add" @click="dialogFormVisible = true">创建项目</el-button>
    <el-button icon="el-icon-box" @click="draftBoxVisible = true">打开草稿箱</el-button>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in projects" :key="item.title">
        <project-card :project="item"></project-card>
      </el-col>
    </el-row>
    <project-create-dialog
      :visible="dialogFormVisible"
      :on-close="onCloseDialog"
      :on-create-project="onCreateProject"
      :on-add-draft="onAddDraft"
    />
    <project-draft-box
      :visible="draftBoxVisible"
      :on-close="onCloseDraft"
      :on-create-project="onCreateProject"
      :open-project-dialog="() => (dialogFormVisible = true)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { projectStore, userStore } from '@/store';
import agent from '@/agent';
import ProjectCreateDialog from '@/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/components/ProjectDraftBox.vue';
import { ProjectDraft } from '@/store/project.module';
import { ResultCommon } from 'achieve-it-contract';
import { Notify } from '@/theme';
import ProjectCard from '@/components/ProjectCard.vue';

@Component({
  components: { ProjectCard, ProjectDraftBox, ProjectCreateDialog }
})
export default class Projects extends Vue {
  projects = [
    { title: '12' },
    { title: '123' },
    { title: '122' },
    { title: '112' },
    { title: '212' },
    { title: '312' }
  ];
  dialogFormVisible = false;
  draftBoxVisible = false;

  onCloseDialog() {
    this.dialogFormVisible = false;
  }
  onCloseDraft() {
    this.draftBoxVisible = false;
  }
  async onCreateProject(form: ProjectDraft): Promise<boolean> {
    let result: ResultCommon | null = null;
    try {
      result = await agent.project.insert({ ...form, status: 0 });
      Notify.success('创建项目《' + form.project_name + '》成功');
      return true;
    } catch (e) {
      Notify.error('创建项目《' + form.project_name + '》失败', result?.msg);
      return false;
    }
  }

  onAddDraft(form: ProjectDraft) {
    projectStore.addProjectDraft(form);
    Notify.info('保存《' + form.project_name + '》到草稿箱');
  }
}
</script>

<style scoped></style>
