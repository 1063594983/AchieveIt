<template>
  <div>
    <h1>我的项目</h1>
    <!-- 用户项目列表 -->
    <el-card shadow="hover" class="mt2" v-for="project in myProjects" :key="project.project_id">
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
        {{ parseTime(project.start_time) }} - {{ parseTime(project.end_time) }}
      </div>
      <div class="my1 h5">
        <b class="opacity">项目领域</b>
        <el-tag class="mr1" v-for="i of project.business" type="primary" :key="i">{{ i }}</el-tag>
      </div>
      <div class="my1 h5">
        <b class="opacity">所用技术</b>
        <el-tag class="mr1" v-for="i of project.technology" type="info" :key="i">{{ i }}</el-tag>
      </div>
      <div class="my1 h5">
        <b class="opacity">我的角色</b>
        <el-tag class="mr1" v-for="i of project.role" type="info" :key="i">{{ i }}</el-tag>
      </div>
      <div class="my1 h5">
        <b class="opacity">我的权限</b>
        <el-tag class="mr1" v-for="i of project.authority" type="info" :key="i">{{ i }}</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectCreateDialog from '@/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/components/ProjectDraftBox.vue';
import { Project, ResultCommon } from 'achieve-it-contract';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectEditDialog from '@/components/ProjectEditDialog.vue';
import agent from '../../agent';
import { userStore } from '../../store';
import dayjs from 'dayjs';

const memberRole = ['开发 Leader', '测试 Leader', '开发人员', '测试人员', '配置管理人员', 'QA', 'EPG'];

@Component({
  components: { ProjectCard },
})
export default class MyProject extends Vue {
  myProjects = [];
//   页面刷新
  async refresh() {
    //   获得当前用户参与的项目
      const myProjects = await agent.project.getJoinProjects(userStore.currentUser.member_id);
      // 筛选进行中的项目
      this.myProjects = myProjects.project_list.filter(pro => pro.status=='进行中');
  }
  mounted() {
      this.refresh();
  }
  parseTime(time) {
      return dayjs(time).format('YYYY年MM月DD日')
  }
}
</script>

<style scoped></style>
