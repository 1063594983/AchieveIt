<template>
  <div>
    <h1>项目功能</h1>
    <div v-if="projects.length != 0">
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
          {{ dayjs(project.start_time).format('YYYY年M月D日') }} - {{ dayjs(project.end_time).format('YYYY年M月D日') }}
        </div>
        <div class="my1 h5">
          <b class="opacity">tips:</b>
          <div class="tip">{{ isFeatureMap[project.project_id] == true?"功能列已上传":"功能列表未上传" }}</div>
        </div>
        <div class="flex justify-between items-center mt2">
          <div class="flex items-center">
            <div v-show="userStore.member.job == '项目经理' && project.status == '已立项'">
              <el-button @click="uploadVisible = true;selectedProject=project.project_id">上传功能excel表</el-button>
            </div>
            <el-button @click="downloadExcel(project.project_id)">下载功能excel表</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else>当前无参与项目</div>
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
import { userStore } from '../../store';
import dayjs from 'dayjs';

@Component({
  components: { ProjectEditDialog, ProjectCard, ProjectDraftBox, ProjectCreateDialog },
})
export default class Feature extends Vue {
  projects: Project[] = [];
  file = null;
  selectedProject = null;
  uploadVisible = false;
  dialogEditForm = null;
  joinProjects = [];
  isFeatureMap = {};
  userStore = userStore;
  async refresh() {
    let projects = null;
    // 如果是项目经理
    if (userStore.member.job == '项目经理') {
      // 获得所有项目
      const result = await agent.project.getAll();
      projects = result.project_list;
    } else {
      //  其他用户
      // 获得用户当前参与的项目
      const joinProjects = await agent.project.getJoinProjects(userStore.currentUser.member_id);
      projects = joinProjects.project_list;
    }

    // for (let pro of projects) {
    //   agent.project.getStatus(pro.project_id).then((r) => {
    //     this.isFeatureMap[pro.project_id] = r.is_feature == 1;
    //   });
    // }
    for (let pro of projects) {
      const r = await agent.project.getStatus(pro.project_id);
    this.isFeatureMap[pro.project_id] = r.is_feature == 1;
    }
    
    // 去除申请立项的项目
    this.projects = projects.filter((pro) => {
      return pro.status != '申请立项';
    });
  }
  mounted() {
    this.refresh();
  }
  dayjs(time) {
    return dayjs(time);
  }
  // 上传功能列表
  async onSubmit() {
    const formData = new FormData();
    formData.append('function', this.file);
    this.uploadVisible = false;
    const result = await agent.feature.uploadFeatureExcel(this.selectedProject, formData);
    if (result.status == 'ok') {
      // 修改项目状态为已上传功能列表
      await agent.project.setStatus(this.selectedProject, {
        is_feature: 1,
      });
      Notify.success('成功', '功能列表上传成功');
      this.refresh();
    } else {
      Notify.error('失败', result.msg);
    }
  }
  changeFile(e) {
    this.file = e.target.files[0];
  }
  async downloadExcel(project_id) {
    const result = await agent.feature.downloadFeatureExcel(project_id);
    if (result.data.status == 'ok') {
      Notify.success('成功', `下载${project_id}功能列表成功`);
    } else {
      Notify.error('失败', result.data.msg);
    }
  }
}
</script>

<style scoped>
.tip {
  color: #e6a23c;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>>
  
