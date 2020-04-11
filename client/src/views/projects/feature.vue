<template>
  <div>
    <h1>项目功能</h1>
    <el-card shadow="hover" class="mt2" v-for="project in projects" :key="project.project_id">
      <div class="flex justify-between items-center mb2">
        <div class="bold h3">{{ project.project_name }}</div>
        <div class="h6 opacity">ID: {{ project.project_id }}</div>
      </div>
      <div class="my1 h5">
        <b class="opacity">项目经理</b>
        {{ project.manager }}
      </div>
      <div class="my1 h5">
        <b class="opacity">项目状态</b>
        {{ project.status }}
      </div>
      <div class="my1 h5">
        <b class="opacity">启止时间</b>
        {{ project.startTime }} - {{ project.endTime }}
      </div>
      <div class="flex justify-between items-center mt2">
        <div>
          <el-tag class="mr1" v-for="i of project.business" type="primary" :key="i">{{ i }}</el-tag>
          <el-tag class="mr1" v-for="i of project.technology" type="info" :key="i">{{ i }}</el-tag>
        </div>
        <div class="flex items-center">
          <el-button @click="uploadVisible = true;selectedProject=project.project_id">上传功能excel表</el-button>
          <el-button @click="downloadExcel(project.project_id)">下载功能excel表</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="上传功能excel表" :visible.sync="uploadVisible">
      <input type="file" name="feature" accept=".xls" @change="changeFile" />
      <br />
      <el-button size="small" type="primary" @click="onSubmit()">提交</el-button>
    </el-dialog>
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
export default class Feature extends Vue {
  projects: Project[] = [];
  file = null;
  selectedProject = null;
  uploadVisible = false;
  dialogEditForm = null;

  async refresh() {
    const result = await agent.project.getAll();
    this.projects = result.project_list;
  }
  mounted() {
    this.refresh();
  }
  async onSubmit() {
    const formData = new FormData();
    formData.append('function', this.file);
    this.uploadVisible = false;
    const result = await agent.feature.uploadFeatureExcel(this.selectedProject, formData);
  }
  changeFile(e) {
    this.file = e.target.files[0];
  }
  async downloadExcel(project_id) {
    const result = await agent.feature.downloadFeatureExcel(project_id);
    if (result.data.status == 'ok') {
      Notify.success('成功', `下载${project_id}功能列表成功`)
    } else {
      Notify.error('失败', result.data.msg);
    }
  }
}
</script>
