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

      <el-table-column label="ID" prop="risk_id" width="100px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.risk_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目名称" prop="project_id">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.project_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="内容" prop="detail">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.detail }}</span>
        </template>
      </el-table-column>

      <el-table-column label="处理状态" prop="solve_status">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.solve_status }}</span>
        </template>
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="100">
        <template slot-scope="scope" >
          <el-button  @click="openDeleteDialog(scope.row.risk_id)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="openEditDialog(scope.row.risk_id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <risk-create-dialog
            :visible="this.createDialogVisible"
            :on-close="closeCreateDialog"
            :on-create="insertRisk" >
      </risk-create-dialog>
    <risk-edit-dialog
            :visible="this.editDialogVisible"
            :on-close="closeEditDialog"
            :on-create="updateRisk" >
    </risk-edit-dialog>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import agent from "@/agent";
  import { Project, Risk, RiskPostBody } from "achieve-it-contract";
  import RiskCreateDialog from "@/components/RiskCreateDialog.vue";
  import { Confirm, Notify, Prompt } from "@/theme";
  import RiskEditDialog from "@/components/RiskEditDialog.vue";


  @Component({
    components: {  RiskCreateDialog,RiskEditDialog },
  })
export default class Risks extends Vue {
  riskList: Risk[] = [];
  projects: Project[] = [];
  selectedProjectId = null;
  isLoading = false;
  createDialogVisible = false;
  editDialogVisible = false;
  risk_id: string;
/*
   打开新建风险记录窗口
 */
    openCreateDialog() {
      this.createDialogVisible = true;
    }
/*
   关闭新建风险记录窗口
 */
    closeCreateDialog() {
      this.createDialogVisible = false;
    }

    /*
   打开编辑风险记录窗口
 */
    openEditDialog(id: string) {
      this.editDialogVisible = true;
      this.risk_id = id;
    }
    /*
       关闭编辑风险记录窗口
     */
    closeEditDialog() {
      this.editDialogVisible = false;
    }
/*
    新建记录操作
 */
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

//删除记录操作
    async openDeleteDialog(id: string) {
      const result = await Confirm.warning('确认', `是否要删除风险记录(ID=${id})？`);
      if (!result) return;
      try {
        await agent.risk.delete(id, {});
        this.riskList = this.riskList.filter((i) => i.risk_id !== Number(id));
        Notify.success('删除成功'+id);
      } catch (e) {
        Notify.error('删除失败');
      }
    }
    /*
    更新风险记录操作
 */
    async updateRisk(form: RiskPostBody) {
      try {
        if (form.detail !== null) await agent.risk.update(this.risk_id,form);
        else {
          Notify.error('细节不为空');
          return false;
        }
        return true;
      } catch (e) {
        Notify.error(this.risk_id+'更新失败');
        return false;
      }
    }
/*
刷新页面
 */
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
/*
获取项目ID列表
 */
  async mounted() {
    this.isLoading = true;
    const result = await agent.project.getAll();
    this.isLoading = false;
    // 筛选进行中的项目
    this.projects = result.project_list.filter(x=>x.status=='进行中');
  }
}
</script>

<style scoped></style>
