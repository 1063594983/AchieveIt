<template>
  <div>
    <h1>人员管理</h1>
    <el-table :data="projects" border>
      <el-table-column prop="project_id" label="项目ID" width="150"></el-table-column>
      <el-table-column prop="project_name" label="项目名" width="150"></el-table-column>
      <el-table-column prop="start_time" label="起止时间" width="300">
        <template slot-scope="scope">{{ dayjs(scope.row.start_time )}} -- {{ dayjs(scope.row.end_time )}}</template>
      </el-table-column>
      <el-table-column prop="project_name" label="状态" width="300">
        <template slot-scope="scope">
          {{ configMap[scope.row.project_id]?peopleMap[scope.row.project_id]?"权限已设置,可再次修改":"权限未设置":"未建立配置库，暂时无法进行人员权限设置" }}
        </template>
      </el-table-column>
      <el-table-column label="人员操作">
        <template slot-scope="scope">
          <el-button @click="openPeopleTable(scope.row)">人员管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="管理人员权限" :visible.sync="tableVisible" width="80%">
      <el-table :data="projectPeople" border>
        <el-table-column prop="member_id" label="成员ID" width="50"></el-table-column>
        <el-table-column prop="member_name" label="成员名称" width="100"></el-table-column>
        <el-table-column label="成员角色" width="400">
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.role">
              <el-checkbox v-for="role in memberRole" :key="role" :label="role" :value="role" :disabled="role=='QA' || role=='EPG'"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column label="成员权限" width="400">
          <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.authority">
              <el-checkbox v-for="a in memberAuthority" :key="a" :label="a" :value="a"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
      <el-button size="small" type="primary" @click="tableVisible=false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { projectStore } from '@/store';
import agent from '@/agent';
import ProjectCreateDialog from '@/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/components/ProjectDraftBox.vue';
import { ProjectDraft } from '@/store/project.module';
import { Project, ResultCommon } from 'achieve-it-contract';
import { Notify } from '@/theme';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectEditDialog from '@/components/ProjectEditDialog.vue';
import { userStore } from '../../store';
import dayjs from 'dayjs';

const memberRole = ["开发 Leader", "测试 Leader", "开发人员", "测试人员", "配置管理人员", "QA", "EPG"];
const initMemberRole = () => {
  return memberRole.map((x, index) => {
    return {
      value: index,
      label: x
    }
  })
}
const memberAuthority = ["git.read", "git.write", "project.read", "project.write", "in_email_list.receive", "in_email_list.send", "in_work_time_register"];
@Component({
  components: { ProjectEditDialog, ProjectCard, ProjectDraftBox, ProjectCreateDialog },
})
export default class Feature extends Vue {
  projects: Project[] = [];
  projectPeople = [];
  tableVisible = false;
  memberRole = memberRole;
  memberAuthority = memberAuthority;
  selectedProjectId = null;
  configMap = {};
  peopleMap = {};
  async refresh() {
    const result = await agent.project.getAll();
    const projects = result.project_list.filter((pro) => {
      return pro.status == '已立项';
    });
    for (let p of projects) {
      const status = await agent.project.getStatus(p.project_id);
      this.configMap[p.project_id] = status.is_config == 1;
      this.peopleMap[p.project_id] = status.is_people == 1;
    }
    this.projects = projects;
  }
  mounted() {
    this.refresh();
  }
  dayjs(time) {
    return dayjs(time).format('YYYY年M月D日');
  }
  async openPeopleTable(row) {
    this.selectedProjectId = row.project_id;
    const status = await agent.project.getStatus(row.project_id);
    if (status.is_config) {
      const people = await agent.member.ofProject(row.project_id);
      this.projectPeople = people.member_list;
      this.tableVisible = true;
    } else {
      Notify.error('失败', '请先通知组织级配置管理员建立配置库');
    }
  }
  async onSubmit() {
    this.tableVisible = false;
    for (let member of this.projectPeople) {
      await agent.member.changeProjectRole(this.selectedProjectId, {
        member_id: member.member_id,
        role: member.role.map(x=>{
          return this.memberRole.indexOf(x)
        }).sort(),
        authority: member.authority
      })
    }
    this.refresh();
    // 修改项目状态为已设置人员权限
    await agent.project.setStatus(this.selectedProjectId, {
      is_people: 1
    });
    // this.refresh();
    // console.log(this.projectPeople);
  }
}
</script>

<style scoped>
.tip {
  color: #e6a23c;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>>
  
