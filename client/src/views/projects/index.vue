<template>
  <div>
    <el-button icon="el-icon-document-add" @click="dialogFormVisible = true">创建项目</el-button>
    <el-button icon="el-icon-box" @click="draftBoxVisible = true">打开草稿箱</el-button>
    <project-card
      :project="item"
      v-for="item in projects"
      :key="item.project_id"
      :remove-project="onRemoveProject(item)"
      :open-edit="onOpenEditDialog"
    ></project-card>
    <project-create-dialog
      :visible="dialogFormVisible"
      :on-close="onCloseDialog"
      :on-create-project="onCreateProject"
      :on-add-draft="onAddDraft"
    />
    <project-edit-dialog
      :visible="!!dialogEditForm"
      :on-close="onCloseEditDialog"
      :on-edit="onEditProject"
      :project="dialogEditForm"
    >
    </project-edit-dialog>
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
import { projectStore } from '@/store';
import agent from '@/agent';
import ProjectCreateDialog from '@/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/components/ProjectDraftBox.vue';
import { ProjectDraft } from '@/store/project.module';
import { Project, ResultCommon } from 'achieve-it-contract';
import { Notify } from '@/theme';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectEditDialog from '@/components/ProjectEditDialog.vue';

@Component({
  components: { ProjectEditDialog, ProjectCard, ProjectDraftBox, ProjectCreateDialog },
})
export default class Projects extends Vue {
  projects: Project[] = [];
  dialogFormVisible = false;
  draftBoxVisible = false;
  dialogEditForm = null;

  async refresh() {
    const result = await agent.project.getAll();
    this.projects = result.project_list;
  }
  mounted() {
    this.refresh();
  }
  onOpenEditDialog(project) {
    this.dialogEditForm = project;
  }
  onCloseEditDialog() {
    this.dialogEditForm = null;
  }
  onCloseDialog() {
    this.dialogFormVisible = false;
  }
  onCloseDraft() {
    this.draftBoxVisible = false;
  }
  onRemoveProject(project: Project) {
    return () => {
      agent.project.delete(project.project_id.toString(), {}).then(() => {
        this.projects = this.projects.filter((i) => i !== project);
        Notify.success('成功', '成功删除项目' + project.project_name);
      });
    };
  }
  onEditProject(oldProject: Project, newProject) {
    return agent.project
      .update(oldProject.project_id.toString(), newProject)
      .then(() => {
        Notify.success('成功', '成功更新项目' + oldProject.project_name);
        for (let key in oldProject) {
          oldProject[key] = newProject[key];
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  async onCreateProject(form: ProjectDraft): Promise<boolean> {
    let result: ResultCommon | null = null;
    try {
      result = await agent.project.insert({ ...form, status: 0 });
      Notify.success('创建项目《' + form.project_name + '》成功');
      return true;
    } catch (e) {
      Notify.error('创建项目《' + form.project_name + '》失败', result?.msg);
      setTimeout(() => this.onAddDraft(form), 1000);
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
