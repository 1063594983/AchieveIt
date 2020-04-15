<template>
  <div>
    <el-input class="mb1" v-model="query" placeholder="输入关键字搜索" />
    <el-dialog title="项目详情" :visible="!!curProject" :before-close="closeDetail">
      <project-card :project="curProject"></project-card>
      <div slot="footer">
        <el-button type="success" v-if="curProject && curProject.status === '申请立项'" @click="onApprove(curProject)"
          >通过</el-button
        >
        <el-button type="danger" v-if="curProject && curProject.status === '申请立项'" @click="onReject(curProject)"
          >拒绝</el-button
        >
        <el-button @click="closeDetail">关闭</el-button>
      </div>
    </el-dialog>

    <el-table border :data="filteredList" style="width: 100%;">
      <el-table-column label="ID" prop="project_id"> </el-table-column>
      <el-table-column label="名称" prop="project_name"> </el-table-column>
      <el-table-column label="状态" prop="status"> </el-table-column>
      <el-table-column width="234px">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDetail(scope.row)">查看详情</el-button>
          <el-button size="mini" type="success" v-if="scope.row.status === '申请立项'" @click="onApprove(scope.row)"
            >通过</el-button
          >
          <el-button size="mini" type="danger" v-if="scope.row.status === '申请立项'" @click="onReject(scope.row)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import agent from '../../agent';
import fuzzysearch from 'fuzzysearch';
import { Notify } from '../../theme';
import ProjectCard from '../../components/ProjectCard';

export default {
  components: { ProjectCard },
  data() {
    return {
      projects: [],
      query: '',
      curProject: null,
    };
  },
  computed: {
    filteredList() {
      if (!this.query) return this.projects;
      return this.projects.filter((i) =>
        fuzzysearch(this.query.toLowerCase(), (i.project_name + i.status).toLowerCase())
      )
    },
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      const result = await agent.project.getAll();
      this.projects = result.project_list.filter(x=>x.status=='申请立项');
    },
    async onApprove(project) {
      try {
        await agent.project.accept(project.project_id);
        Notify.success('通过审核', project.project_name);
        project.status = '已立项';
        this.refresh();
      } catch (e) {
        Notify.error(e);
        this.refresh();
      }
    },

    async onReject(project) {
      try {
        await agent.project.refuse(project.project_id);
        Notify.success('成功驳回', project.project_name);
        project.status = '立即驳回';
      } catch (e) {
        Notify.error(e);
      }
    },
    showDetail(project) {
      this.curProject = project;
    },
    closeDetail() {
      this.curProject = null;
    },
  },
};
</script>
