<template>
  <el-card shadow="hover" class="mt2" v-if="project">
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
    <div class="my1 h5" v-show="project.status == '已立项'">
      <b class="opacity">当前状态</b>
      {{ config?"配置库已建立":"配置库未建立" }};&nbsp;&nbsp;{{ EPG?"EPG 已分配":"EPG 未分配" }};&nbsp;&nbsp;{{ QA?"QA 已分配":"QA 未分配" }}
      ;&nbsp;&nbsp;{{ feature?"已上传功能列表":"未上传功能列表" }};&nbsp;&nbsp;{{ people?"已设置人员权限":"未设置人员权限" }}
    </div>
    <div class="my1 h5">
      <b class="opacity">启止时间</b>
      {{ startTime }} - {{ endTime }}
    </div>
    <div class="my1 h5">
      <b class="opacity">项目领域</b>
      <el-tag class="mr1" v-for="i of project.business" type="primary" :key="i">{{ i }}</el-tag>
    </div>
    <div class="my1 h5">
      <b class="opacity">所用技术</b>
      <el-tag class="mr1" v-for="i of project.technology" type="info" :key="i">{{ i }}</el-tag>
    </div>
    <div class="my1 h5" v-show="project.status == '已立项'">
      <b class="opacity">tips</b>
      <div class="tip">{{ EPG?"":"待EPG Leader分配EPG" }}</div>
      <div class="tip">{{ config?(people?"":"待项目经理设置人员权限"):"待配置管理员建立配置库" }}</div>
      <div class="tip">{{ QA?"":"待QA经理分配QA" }}</div>
      <div class="tip">{{ feature?"":"待项目经理上传功能列表" }}</div>
    </div>
    <div class="flex justify-between items-center mt2">
      <div class="flex items-right" v-if="openEdit">
        <el-dropdown @command="handleCommand" trigger="click">
          <el-icon name="more" class="py1 opacity cursor"></el-icon>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit">
              <div v-if="userStore.member.job == 'QA Manager'">分配QA</div>
            </el-dropdown-item>
            <!-- <el-dropdown-item style="color: #f56c6c;" command="delete" icon="el-icon-delete">删除</el-dropdown-item> -->
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
import { userStore } from '../store';
import { computed } from '@vue/composition-api';

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
  feature = false;
  people = false;
  userStore = userStore;

  async refresh() {
    if (this.project.status == '已立项') {
      const status = await agent.project.getStatus(this.project.project_id);
      this.config = status.is_config == 1;
      this.feature = status.is_feature == 1;
      this.EPG = status.is_epg == 1;
      this.QA = status.is_qa == 1;
      this.people = status.is_people == 1;
      if (this.config && this.EPG && this.QA && this.feature && this.people && this.project.status == '已立项') {
        await agent.project.update(this.project.project_id, {
          status: 3,
        });
        this.project.status = '进行中';
    }
    }
  }

  async mounted() {
    this.refresh();
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

.tip {
  color: #e6a23c;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>
