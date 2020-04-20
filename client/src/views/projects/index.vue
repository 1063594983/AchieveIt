<template>
  <div>
    <div v-if="userStore.member.job == '项目经理'" class="flex items-center justify-between">
      <div>
        <el-button icon="el-icon-document-add" @click="dialogFormVisible = true">创建项目</el-button>
        <el-button icon="el-icon-box" @click="draftBoxVisible = true">打开草稿箱</el-button>
      </div>
      <el-input style="width: 200px" v-model="key_word" placeholder="请输入项目名" @input="searchProject"></el-input>
    </div>
    <el-row v-if="userStore.member.job != '项目经理'">
      <el-col :span="6">
        <el-input v-model="key_word" placeholder="请输入项目名" @input="searchProject"></el-input>
      </el-col>
    </el-row>
    <!-- 项目列表 -->
    <project-card
      :project="item"
      v-for="item in projects"
      :key="item.project_id"
      :remove-project="onRemoveProject(item)"
      :open-edit="onOpenEditDialog"
      :update="refresh"
    ></project-card>

    <!-- 项目创建窗口 -->
    <project-create-dialog
      :visible="dialogFormVisible"
      :on-close="onCloseDialog"
      :on-create-project="onCreateProject"
      :on-add-draft="onAddDraft"
    />
    <!-- 项目编辑窗口 -->
    <el-dialog :visible.sync="editFormVisible" title>
      <!-- EPG分配窗口 -->
      <div v-if="userStore.member.job === 'EPG Leader'">
        <h1>分配EPG</h1>
        <el-table :data="joinMembers" @selection-change="handleSelectionChange" max-height="250">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="100" property="member_id" label="ID"></el-table-column>
          <el-table-column width="100" property="member_name" label="姓名"></el-table-column>

          <el-table-column width="300" property="role.length!=0?role:'无'" label="项目中角色">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">{{ scope.row.role }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" property="email" label="邮件地址"></el-table-column>
          <el-table-column
            width="100"
            property="authority.length!=0?authority:'无'"
            label="项目中权限"
          ></el-table-column>
        </el-table>
        <el-button @click="addEPGToPro">添加</el-button>
      </div>
      <!-- QA 分配窗口 -->
      <div v-else-if="userStore.member.job == 'QA Manager'">
        <h1>分配QA</h1>
        <el-table :data="joinMembers" @selection-change="handleSelectionChange" max-height="250">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="100" property="member_id" label="ID"></el-table-column>
          <el-table-column width="100" property="member_name" label="姓名"></el-table-column>

          <el-table-column width="300" property="role.length!=0?role:'无'" label="项目中角色">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">{{ scope.row.role }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" property="email" label="邮件地址"></el-table-column>
          <el-table-column
            width="100"
            property="authority.length!=0?authority:'无'"
            label="项目中权限"
          ></el-table-column>
        </el-table>
        <el-button @click="addQAToPro">添加</el-button>
      </div>
      <!-- 项目经理 -->
    </el-dialog>

    <!-- 项目导入窗口
    <el-dialog :visible.sync="fileFormVisible" title="项目导入">
      <el-input type="file" v-model="file"></el-input>
      <br />
      <el-button @click="importProject">提交</el-button>
      <el-button @click="fileFormVisible = false">取消</el-button>
    </el-dialog> -->
    <project-draft-box
      :visible="draftBoxVisible"
      :on-close="onCloseDraft"
      :on-create-project="onCreateProject"
      :open-project-dialog="() => (dialogFormVisible = true)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { projectStore, userStore } from '@/store';
import agent from '@/agent';
import ProjectCreateDialog from '@/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/components/ProjectDraftBox.vue';
import { ProjectDraft } from '@/store/project.module';
import { Project, ResultCommon } from 'achieve-it-contract';
import { Notify } from '@/theme';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectEditDialog from '@/components/ProjectEditDialog.vue';

const memberRole = ['开发 Leader', '测试 Leader', '开发人员', '测试人员', '配置管理人员', 'QA', 'EPG'];

@Component({
  components: { ProjectEditDialog, ProjectCard, ProjectDraftBox, ProjectCreateDialog },
})
export default class Projects extends Vue {
  projects: Project[] = [];
  dialogFormVisible = false;
  draftBoxVisible = false;
  dialogEditForm = null;
  memberJob: -1;
  userStore = userStore;
  editFormVisible = false;
  joinMembers = [];
  selectedMembers = [];
  selectedProject = null;
  isFinished = false;
  fileFormVisible = false;
  file = null;
  key_word = '';
  async refresh() {
    const result = await agent.project.getAll();
    if (userStore.member.job == 'EPG Leader' || userStore.member.job == 'QA Manager') {
      this.projects = result.project_list.filter((p) => {
        return p.status == '已立项';
      });
    } else {
      this.projects = result.project_list;
    }
  }
  mounted() {
    this.refresh();
  }
  async onOpenEditDialog(project) {
    this.selectedProject = project;
    this.editFormVisible = true;
    const members = await agent.member.ofProject(project.project_id);
    this.joinMembers = members.member_list.filter((m) => m.job == '普通员工');
  }
  async addEPGToPro() {
    for (let m of this.selectedMembers) {
      if (m.role.indexOf('EPG') == -1) {
        m.role.push('EPG');
      }
      await agent.member.changeProjectRole(this.selectedProject.project_id, {
        member_id: m.member_id,
        role: m.role.map((x) => {
          return memberRole.indexOf(x);
        }),
        authority: m.authority,
      });
    }
    // 修改项目状态为已设置EPG
    await agent.project.setStatus(this.selectedProject.project_id, {
      is_epg: 1,
    });
    this.refresh();
    this.editFormVisible = false;
  }
  async addQAToPro() {
    for (let m of this.selectedMembers) {
      if (m.role.indexOf('QA') == -1) {
        m.role.push('QA');
      }
      await agent.member.changeProjectRole(this.selectedProject.project_id, {
        member_id: m.member_id,
        role: m.role.map((x) => {
          return memberRole.indexOf(x);
        }),
        authority: m.authority,
      });
    }
    // 改变项目状态为已设置QA
    await agent.project.setStatus(this.selectedProject.project_id, {
      is_qa: 1,
    });
    this.refresh();
    this.editFormVisible = false;
  }
  handleSelectionChange(val) {
    this.selectedMembers = val;
  }
  onCloseEditDialog() {
    this.dialogEditForm = null;
  }
  onCloseDialog() {
    this.dialogFormVisible = false;
  }
  onCloseDraft() {
    this.draftBoxVisible = false;
  }
  onRemoveProject(project: Project) {
    return () => {
      agent.project.delete(project.project_id.toString(), {}).then(() => {
        this.projects = this.projects.filter((i) => i !== project);
        Notify.success('成功', '成功删除项目' + project.project_name);
      });
    };
  }
  onEditProject(oldProject: Project, newProject) {
    return agent.project
      .update(oldProject.project_id.toString(), newProject)
      .then(() => {
        Notify.success('成功', '成功更新项目' + oldProject.project_name);
        for (let key in oldProject) {
          oldProject[key] = newProject[key];
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  async onCreateProject(form: ProjectDraft): Promise<boolean> {
    let result: ResultCommon | null = null;
    try {
      result = await agent.project.insert({ ...form, status: 0 });
      Notify.success('创建项目《' + form.project_name + '》成功');
      this.refresh();
      return true;
    } catch (e) {
      Notify.error('创建项目《' + form.project_name + '》失败', result?.msg);
      setTimeout(() => this.onAddDraft(form), 1000);
      return false;
    }
  }

  onAddDraft(form: ProjectDraft) {
    projectStore.addProjectDraft(form);
    Notify.info('保存《' + form.project_name + '》到草稿箱');
  }

  searchProject() {
    if (this.key_word == '') {
      this.refresh();
      return;
    }
    let result = [];
    let len = this.projects.length;
    for (let i=0; i<len; i++) {
      if (this.projects[i].project_name.indexOf(this.key_word) != -1) {
        result.push(this.projects[i])
      }
    }
    this.projects = result;
  }

  reset() {
    this.key_word = '';
    this.refresh();
  }
}
</script>

<style scoped></style>
