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
    <div class="my1 h5" v-if="project.business.length">
      <b class="opacity mr1">项目领域</b>
      <el-tag class="mr1" v-for="i of project.business" type="primary" :key="i">{{ i }}</el-tag>
    </div>
    <div class="my1 h5" v-if="project.technology.length">
      <b class="opacity mr1">所用技术</b>
      <el-tag class="mr1" v-for="i of project.technology" type="info" :key="i">{{ i }}</el-tag>
    </div>
    <div class="my1 h5" v-show="project.status == '已立项'">
      <ul class="list-reset">
        <li class="tip" v-if="EPG">待EPG Leader分配EPG</li>
        <template v-if="config">
          <li class="tip" v-if="people">待项目经理设置人员权限</li>
        </template>
        <li class="tip" v-else>待配置管理员建立配置库</li>
        <li class="tip" v-if="QA">待QA经理分配QA</li>
        <li class="tip" v-if="feature">待项目经理上传功能列表</li>
      </ul>
    </div>
    <div class="flex justify-between items-center mt2">
      <el-dropdown @command="handleCommand" trigger="click" v-if="userStore.member.job != '项目经理'">
        <el-button type="text" class="py1" icon="el-icon-arrow-down">更多操作</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">
            <div v-if="userStore.member.job == 'QA Manager'">分配QA</div>
            <div v-else-if="userStore.member.job == 'EPG Leader'">分配EPG</div>
            <div v-else-if="userStore.member.job == '项目经理' && project.status=='进行中'">申请结项</div>
          </el-dropdown-item>
          <!-- <el-dropdown-item style="color: #f56c6c;" command="delete" icon="el-icon-delete">删除</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleCommand2" trigger="click" v-else-if="['进行中', '已交付', '结束'].includes(project.status)">
        <el-button type="text" class="py1" icon="el-icon-arrow-down">更新状态</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="jiaofu" v-show="project.status=='进行中'">
            <div>申请交付</div>
          </el-dropdown-item>
          <el-dropdown-item command="jieshu" v-show="project.status=='已交付'">
            <div>申请结束</div>
          </el-dropdown-item>
          <el-dropdown-item command="guidang" v-show="project.status=='结束'">
            <div>申请归档</div>
          </el-dropdown-item>
          <!-- <el-dropdown-item style="color: #f56c6c;" command="delete" icon="el-icon-delete">删除</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
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
  @Prop() update!: Function;
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
        .then((agreement) => {
          if (agreement) this.removeProject();
        })
    }
  }
  handleCommand2(command) {
    if (command == 'jiaofu') {  //  交付
      Confirm.warning('确定', "确定交付吗").then((agreement)=>{
        // 交付
        if (!agreement) return;
        agent.project.update(this.project.project_id, {
          status: 4
        }).then(res=>{
          // this.refresh();
          this.update();
        });

      })

    } else if (command == 'jieshu') {  //结束
      Confirm.warning('确定', "确定结束项目吗").then((agreement)=>{
        // 结束
        if (!agreement) return;
        agent.project.update(this.project.project_id, {
          status: 5
        }).then(res=>{
          // this.refresh();
          this.update();
        });
      })
    } else {  //  归档
      Confirm.warning('确定', "确定申请归档吗").then((agreement)=>{
        // 归档
        if (!agreement) return;
        agent.project.update(this.project.project_id, {
          status: 6
        }).then(res=>{
          // this.refresh();
          this.update();
        });
      })

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
