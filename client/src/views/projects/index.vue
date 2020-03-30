<template>
  <div>
    <el-button @click="dialogFormVisible = true">创建项目</el-button>
    <el-button @click="draftBoxVisible = true">打开草稿箱</el-button>
    <pre>{{ projectDetail }}</pre>
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
import ProjectCreateDialog from '@/views/projects/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/views/projects/components/ProjectDraftBox.vue';
import { ProjectDraft } from '@/store/project.module';
import { ResultCommon } from 'achieve-it-contract';
import { Notify } from '@/theme';

@Component({
  components: { ProjectDraftBox, ProjectCreateDialog }
})
export default class Projects extends Vue {
  projectDetail = 'loading...';
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

  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.project.get('20200329A', { token: user.token });
    this.projectDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped></style>
