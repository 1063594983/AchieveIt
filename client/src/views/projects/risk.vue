<template>
  <div>
    <div class="flex items-center justify-between">
      <h1>风险管理</h1>
      <div>
        <el-button icon="el-icon-risk-add" @click="openCreateDialog">新建风险记录</el-button>
      </div>
      <el-select v-model="selectedProjectId" filterable>
        <el-option
          v-for="i of projects"
          :key="i.project_id"
          :value="i.project_id"
          :label="`${i.project_name}(${i.project_id})`"
        ></el-option>
      </el-select>
    </div>
    <el-table :data="riskList" v-loading="isLoading">
      <el-table-column label="ID" prop="risk_id" width="100px"></el-table-column>
      <el-table-column label="项目名称" prop="project_id"></el-table-column>
      <el-table-column label="内容" prop="detail"></el-table-column>
      <el-table-column label="处理状态" prop="solve_status"></el-table-column>
    </el-table>
    <risk-create-dialog
            :visible="this.createDialogVisible"
            :on-close="closeCreateDialog"
            :on-create="insertRisk" >
      </risk-create-dialog>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import agent from "@/agent";
  import { Project, Risk, RiskPostBody } from "achieve-it-contract";
  import RiskCreateDialog from "@/components/RiskCreateDialog.vue";
  import { Notify } from "@/theme";


  @Component({
    components: {  RiskCreateDialog },
  })
export default class Risks extends Vue {
  riskList: Risk[] = [];
  projects: Project[] = [];
  selectedProjectId = null;
  isLoading = false;
  createDialogVisible = false;

    openCreateDialog() {
      this.createDialogVisible = true;
    }
    closeCreateDialog() {
      this.createDialogVisible = false;
    }

    async insertRisk(form: RiskPostBody) {
      try {
        if (form.detail !== null) await agent.risk.insert(form);
        else {
          Notify.error('细节不为空');
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    }

  refresh() {
    this.isLoading = true;
    agent.risk.ofProject(this.selectedProjectId).then(result => {
        this.riskList = result.risk_list;
      this.isLoading = false;
    })

  }

  @Watch('selectedProjectId')
  onProjectChanges() {
    this.refresh();
  }

  async mounted() {
    const result = await agent.project.getAll();
    this.projects = result.project_list;
  }
}
</script>

<style scoped></style>
