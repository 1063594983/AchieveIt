<template>
  <div>
    <h1>活动中心</h1>
    <div class="flex items-center justify-between">
      <el-button icon="el-icon-document-add" @click="activityFormVisible = true">添加活动</el-button>
    <el-autocomplete
      class="inline-input"
      v-model="selectedActivity"
      :fetch-suggestions="querySearch"
      placeholder="请输入项目ID"
      @select="handleSelect"
    ></el-autocomplete>
    </div>
    <div v-if="projects.length == 0">
      当前无参与项目
    </div>
    <div v-else-if="activitys.length == 0">
      当前参与项目无活动提交
    </div>
    <div v-else-if="filterActivitys.length != 0">
      <el-card shadow="hover" class="mt2" v-for="a in filterActivitys" :key="a.activity_id">
      <div class="flex justify-between items-center mb2">
        <div class="bold h3">项目ID: {{ a.project_id }}</div>
        <div class="h6 opacity">ID: {{ a.activity_id }}</div>
      </div>
      <div class="my1 h5">
        <b class="opacity">活动名称</b>
        {{ a.activity_name }}
      </div>
      <div class="my1 h5">
        <b class="opacity">活动内容</b>
        {{ a.activity_content }}
      </div>
    </el-card>
    </div>
    <div v-else>
      当前所选项目无活动
    </div>
    <el-dialog title="添加活动" :visible.sync="activityFormVisible">
      <el-form :model="form" label-position="left" label-width="5rem">
        <el-form-item label="项目ID">
          <el-autocomplete
            class="inline-input"
            v-model="form.project_id"
            :fetch-suggestions="querySearch"
            placeholder="请输入项目ID"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-cascader
            v-model="form.activity_name"
            :options="options"
            @change="handleChange"
            placeholder="第一层 / 第二层"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="form.activity_content" placeholder="请输入活动内容" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="activityFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createActivity">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Activity } from 'achieve-it-contract';
import { userStore } from '@/store';
import agent from '@/agent';
const activitys = [
  {
    prefix: '工程活动',
    activityList: ['需求开发', '设计', '编码', '单体测试', '集成测试', '系统测试', '交付', '维护'],
  },
  {
    prefix: '管理活动',
    activityList: ['范围管理', '计划与调整', '监控与分析', '联络与沟通'],
  },
  {
    prefix: '外包活动',
    activityList: ['外包管理', '外包验收', '外包支持'],
  },
  {
    prefix: '支持活动',
    activityList: ['配置管理', 'QA 审计', '会议报告总结', '培训', '其他'],
  },
];
function initActivity() {
  const result = [];
  for (let i = 0; i < activitys.length; i++) {
    const activity = {
      value: i,
      label: activitys[i].prefix,
    };
    const children = [];
    for (let j = 0; j < activitys[i].activityList.length; j++) {
      const child = {
        value: j,
        label: activitys[i].activityList[j],
      };
      children.push(child);
    }
    activity['children'] = children;
    result.push(activity);
  }
  return result;
}
function initForm() {
  return {
    project_id: '',
    activity_name: [],
    activity_content: '',
  };
}
@Component
export default class Activitys extends Vue {
  filterActivitys: Activity [] = [];
  activitys: Activity [] = [];
  activityFormVisible = false;
  projects: { value: string }[] = [];
  options = initActivity();
  selectedActivity = "";
  form: {
    project_id: string;
    activity_name: string[];
    activity_content: string;
  } = initForm();

  async refresh() {
    const result = await agent.project.getJoinProjects(userStore.currentUser.member_id);
    // 筛选进行中的项目
    this.projects = result.project_list.filter(x=>x.status=='进行中').map((x) => { 
      return { value: x.project_id.toString() };
    });
    const activitys = await agent.activity.getAll();
    this.filterActivitys = this.activitys = activitys.data.activity_list.filter((activity) => {
      return this.projects.map(a=>a.value).indexOf(activity.project_id) != -1
    });
  }

  async mounted() {
    this.refresh();
    // const user = userStore.currentUser!;
    // const result = await agent.activity.get('2', { token: user.token });
    // this.activityDetail = JSON.stringify(result, null, 2);
  }
  createFilter(queryString) {
    return (restaurant) => {
      return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
  }
  async querySearch(queryString, cb) {
    const projects = this.projects;
    const results = queryString ? projects.filter(this.createFilter(queryString)) : projects;
    // 调用 callback 返回建议列表的数据
    cb(results);
  }
  async createActivity() {
    const form = {
      project_id: this.form.project_id,
      activity_content: this.form.activity_content,
      activity_name: this.form.activity_name.join('-')
    };
    const result = await agent.activity.insert(form);
    this.activityFormVisible = false;
    this.refresh();
  }

  handleChange(value) {
    console.log(value);
  }
  handleSelect(e) {
    this.filterActivitys = this.activitys.filter((a) => {
      return a.project_id == e.value;
    })
  }
}
</script>

<style scoped></style>
