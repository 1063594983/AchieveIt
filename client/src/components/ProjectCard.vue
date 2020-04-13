<template>
  <el-card shadow="hover" class="mt2" v-if="project">
    <div class="flex justify-between items-center mb2">
      <div class="bold h3">{{ project.project_name }}</div>
      <div class="h6 opacity">ID: {{ project.project_id }}</div>
    </div>
    <div class="my1 h5"><b class="opacity">项目经理 </b>{{ project.manager }}</div>
    <div class="my1 h5"><b class="opacity">项目状态 </b>{{ project.status }}
     <div v-if="project.status=='已立项'">({{ config?"配置库已建立":"配置库未建立" }};&nbsp;&nbsp;{{ EPG?"EPG 已分配":"EPG 未分配" }};&nbsp;&nbsp;{{ QA?"QA 已分配":"QA 未分配" }})</div>
     
     </div>
    <div class="my1 h5"><b class="opacity">启止时间 </b>{{ startTime }} - {{ endTime }}</div>
    <div class="flex justify-between items-center mt2">
      <div>
        <el-tag class="mr1" v-for="i of project.business" type="primary" :key="i">{{ i }}</el-tag>
        <el-tag class="mr1" v-for="i of project.technology" type="info" :key="i">{{ i }}</el-tag>
      </div>
      <div class="flex items-center" v-if="openEdit">
        <el-dropdown @command="handleCommand" trigger="click">
          <el-icon name="more" class="py1 opacity cursor"></el-icon>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit" icon="el-icon-edit">编辑</el-dropdown-item>
            <el-dropdown-item style="color: #f56c6c;" command="delete" icon="el-icon-delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Project } from 'achieve-it-contract';
import dayjs from 'dayjs';
import { Confirm } from '@/theme';
import ProjectEditDialog from '@/components/ProjectEditDialog.vue';
import agent from '../agent';
import axios from 'axios';

@Component({
  components: { ProjectEditDialog },
})
export default class ProjectCard extends Vue {
  @Prop({ required: true }) project!: Project;
  @Prop() removeProject!: Function;
  @Prop() openEdit!: Function;

  config = false;
  EPG = false;
  QA = false;
  async mounted() {
    const result = await agent.config.get(this.project.project_id);
    if (result.status == 'error') {
      this.config = false;
    } else {
      this.config = true;
    }
  }
  get startTime() {
    return dayjs(this.project.start_time).format('YYYY年M月D日');
  }
  get endTime() {
    return dayjs(this.project.end_time).format('YYYY年M月D日');
  }
  handleCommand(command) {
    if (command === 'edit') {
      this.openEdit(this.project);
    } else {
      Confirm.warning('提示', '此操作将永久删除该项目, 是否继续?')
        .then(() => this.removeProject())
        .catch(() => {});
    }
  }
}
</script>

<style scoped lang="scss">
.avatar {
  width: 28px;
  height: 28px;
}
</style>
