<template>
  <div>
    <h1>缺陷管理</h1>
    <div class="flex items-center justify-between">
      <el-button icon="el-icon-document-add" @click="defectFormVisible = true">添加缺陷</el-button>
      <el-autocomplete
        class="inline-input"
        v-model="selectedProject"
        :fetch-suggestions="querySearch"
        placeholder="请输入项目ID"
        @selectChange="handleSelect"
      ></el-autocomplete>
    </div>
    <div v-if="defects.length != 0">
      <el-card shadow="hover" class="mt2" v-for="defect in filterDefects" :key="defect.defect_id">
        <div class="flex justify-between items-center mb2">
          <div class="bold h3">项目ID: {{ defect.project_id }}</div>
          <div class="h6 opacity">ID: {{ defect.defect_id }}</div>
        </div>
        <div class="my1 h5">
          <b class="opacity">内容</b>
          {{ defect.defect_content }}
        </div>
        <div class="my1 h5">
          <b class="opacity">状态</b>
          {{ defect.status }}
        </div>

        <div class="flex justify-between items-center mt2">
          <div class="flex items-center" v-if="defect.status == '未解决'">
            <el-button @click="solveDefect(defect.defect_id)">解决</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else-if="projects.length == 0">当前无参与项目</div>
    <div v-else-if="defects.length == 0">当前参与项目无缺陷提交</div>
    <el-dialog title="添加缺陷" :visible.sync="defectFormVisible">
      <el-form :model="form" label-position="left" label-width="5rem">
        <el-form-item label="项目ID">
          <el-autocomplete
            class="inline-input"
            v-model="form.project_id"
            :fetch-suggestions="querySearch"
            placeholder="请输入项目ID"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="缺陷内容">
          <el-input placeholder="请输入缺陷内容" type="textarea" v-model="form.defect_content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="createDefect">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Defect, Project } from 'achieve-it-contract';
import agent from '@/agent';
import { Notify } from '../../theme';
import { userStore } from '../../store';

@Component
export default class Defects extends Vue {
  filterDefects: Defect[] = [];
  defects: Defect[] = [];
  projects = [];
  selectedProject = '';
  defectFormVisible = false;
  form = {
    project_id: '',
    defect_content: ''
  };
  async refresh() {
    // 获得和当前用户相关的所有缺陷
    const result = await agent.defect.getAllOfMember(userStore.currentUser.member_id);
    const joinProjects = await agent.project.getJoinProjects(Number(userStore.currentUser.member_id));
    // 筛选进行中的项目
    this.projects = joinProjects.project_list
      .filter((x) => x.status == '进行中')
      .map((x) => {
        return {
          value: `${x.project_name}(${x.project_id})`,
        };
      });

    this.filterDefects = this.defects = result.defect_list;

  }
  mounted() {
    this.refresh();
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
  async solveDefect(defect_id) {
    const result = await agent.defect.solve(defect_id);
    this.refresh();
  }
  handleSelect(item) {
    if(item == '') this.filterDefects = this.defects;
    this.selectedProject = item.value;
    this.filterDefects = this.defects.filter((defect) => {
      return defect.project_id == this.selectedProject.substring(this.selectedProject.indexOf('(') + 1, this.selectedProject.indexOf(')'));
    });
  }
  FormInit() {
    return {
      project_id: '',
      defect_content: '',
    };
  }
  onClose() {
    this.form = this.FormInit();
    this.defectFormVisible = false;
  }
  async createDefect() {
    this.form.project_id = this.form.project_id.split("(")[1].replace(')', "");
    const result = await agent.defect.postDefect(this.form);
    if (result.data.status == 'ok') {
      Notify.success('成功', '添加缺陷成功');
    } else {
      Notify.error('失败', `项目${this.form.project_id}添加缺陷失败`);
    }
    this.refresh();
    this.defectFormVisible = false;
  }
}
</script>

<style scoped></style>
