<template>
  <div>
    <div class="flex items-center justify-between">
      <h1>风险管理</h1>
      <div>
        <el-button @click="uploadVisible=true">上传风险记录</el-button>
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
    <!-- 上传risk窗口 -->
    <el-dialog title="上传功能excel表" :visible.sync="uploadVisible">
      请选择:
      <el-select v-model="uploadProjectId" placeholder="项目ID">
        <el-option
          v-for="item in projects"
          :key="item.project_id"
          :label="`${item.project_id}(${item.project_name})`"
          :value="item.project_id"
        ></el-option>
      </el-select>
      <el-upload
        :on-change="handleChange"
        :on-remove="handleRemove"
        action=""
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">选择文件</el-button>

        <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
      </el-upload>
      <br />
      <el-button size="small" type="primary" @click="onSubmit()">提交</el-button>
      <el-button size="small" type="primary" @click="uploadVisible = false">取消</el-button>
    </el-dialog>
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
          <el-row v-for="item in buildDetails(scope.row.detail)" :key="item.key">
            {{ item.key }} : {{ item.value }}
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="处理状态" prop="solve_status">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ riskStatus[scope.row.solve_status] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openDeleteDialog(scope.row.risk_id)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="followRisk(scope.row.risk_id)" v-show="scope.row.solve_status==0">跟进</el-button>
          <el-button type="text" size="small" @click="solveRisk(scope.row.risk_id)" v-show="scope.row.solve_status==1">解决</el-button>
        </template>
      </el-table-column>
    </el-table>
    <risk-edit-dialog
      :visible="this.editDialogVisible"
      :on-close="closeEditDialog"
      :on-create="updateRisk"
    ></risk-edit-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import agent from '@/agent';
import { Project, Risk, RiskPostBody } from 'achieve-it-contract';
import RiskCreateDialog from '@/components/RiskCreateDialog.vue';
import { Confirm, Notify, Prompt } from '@/theme';
import RiskEditDialog from '@/components/RiskEditDialog.vue';
import xlsx from 'xlsx';
import { userStore } from '../../store';
const riskStatus = ['未处理', '正在跟进', '已解决'];

@Component({
  components: { RiskCreateDialog, RiskEditDialog },
})
export default class Risks extends Vue {
  riskList: Risk[] = [];
  projects: Project[] = [];
  selectedProjectId = null;
  isLoading = false;
  createDialogVisible = false;
  editDialogVisible = false;
  uploadVisible = false;
  file = null;
  risk_id = '';
  uploadProjectId = '';
  fileTemp = null;
  riskStatus = riskStatus;

  async followRisk(risk_id) {
    await agent.risk.update(risk_id, {
      solve_status: 1
    })
    this.refresh();
  }
  async solveRisk(risk_id) {
    await agent.risk.update(risk_id, {
      solve_status: 2
    })
    this.refresh();
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
  //删除记录操作
  async openDeleteDialog(id: string) {
    const result = await Confirm.warning('确认', `是否要删除风险记录(ID=${id})？`);
    if (!result) return;
    try {
      await agent.risk.delete(id, {});
      this.riskList = this.riskList.filter((i) => i.risk_id !== Number(id));
      Notify.success('删除成功' + id);
    } catch (e) {
      Notify.error('删除失败');
    }
  }
  changeFile(e) {
    this.file = e.target.files[0];
  }
  handleChange(file, fileList) {
    this.fileTemp = file.raw;
  }

  handleRemove(file, fileList) {
    this.fileTemp = null;
  }
  // 风险details
  buildDetails(detail) {
    const details = JSON.parse(detail);
    const result = [];
    for (let d in details) {
      result.push({
        key: d,
        value: details[d]
      })
    }
    return result;
  }
  // 上传风险记录
  async onSubmit() {
    if (!this.uploadProjectId) {
      Notify.error('失败', '请选择项目');
      return ;
    }
    if (!this.fileTemp) {
      Notify.error('失败', '请选择文件');
      return ;
    }
    
    const formData = new FormData();
    formData.append('risk', this.fileTemp);
    this.uploadVisible = false;
    const result = await agent.risk.upload(this.uploadProjectId, formData);
    console.log(result);
    for (let r of result.result) {
      // console.log(r);
      await agent.risk.add({
        detail: r.detail,
        owner: userStore.currentUser.member_id,
        stackholders: [],
        project_id: this.uploadProjectId,
        solve_status: 0
      })
    }
    this.refresh();
  }
  /*
    更新风险记录操作
 */
  async updateRisk(form: RiskPostBody) {
    try {
      if (form.detail !== null) await agent.risk.update(this.risk_id, form);
      else {
        Notify.error('细节不为空');
        return false;
      }
      return true;
    } catch (e) {
      Notify.error(this.risk_id + '更新失败');
      return false;
    }
  }
  /*
刷新页面
 */
  async refresh() {
    this.isLoading = true;
    // agent.risk.ofProject(this.selectedProjectId).then((result) => {
    //   this.riskList = result.risk_list;
    //   this.isLoading = false;
    // });
    const riskOfMember = await agent.risk.ofMember(userStore.currentUser.member_id);
    this.riskList = riskOfMember.risk_list;
    this.isLoading = false;
    console.log(riskOfMember);
  }

  @Watch('selectedProjectId')
  onProjectChanges() {
    this.refresh();
  }
  /*
获取项目ID列表
 */
  async mounted() {
    this.refresh();
    this.isLoading = true;
    const result = await agent.project.getAll();
    this.isLoading = false;
    // 筛选进行中的项目
    this.projects = result.project_list.filter((x) => x.status == '进行中');
  }
}
</script>

<style scoped></style>
