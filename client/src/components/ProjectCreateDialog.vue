<template>
  <el-dialog
    title="创建项目"
    :visible.sync="visible"
    width="420px"
    :close-on-click-modal="false"
    :before-close="onClose"
    :open="onOpen"
  >
    <el-form :model="form" label-position="left" label-width="5rem">
      <el-form-item label="项目ID">
        <el-input v-model="form.project_id" placeholder="输入项目ID"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.project_name" placeholder="输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="客户主体">
        <el-input v-model="form.client_info" placeholder="输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="项目开始">
        <el-date-picker type="date" placeholder="开始日期" v-model="form.start_time"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目终止">
        <el-date-picker type="date" placeholder="终止日期" v-model="form.end_time"></el-date-picker>
      </el-form-item>
      <el-form-item label="业务领域">
        <el-input placeholder="业务领域" v-model="newBusinessTag"></el-input>
        <el-tag v-for="tag in businessTags" :key="tag">{{ tag }}</el-tag>
        <el-button
          type="primary"
          round
          size="mini"
          @click="addBusiness">+</el-button>

        <!-- <el-tree-select
          :styles="{ width: '300px' }"
          v-model="form.business"
          :selectParams="{ placeholder: 'f', multiple: true }"
          :treeParams="{ ...treeParams, data: businessType }"
        /><el-button>添加</el-button>-->
      </el-form-item>
      <el-form-item label="技术框架">
        <el-input placeholder="技术框架" v-model="newTechTag"></el-input>
        <el-tag v-for="tag in technologyTags" :key="tag">{{ tag }}</el-tag>
        <el-button type="primary" size="mini" round @click="addTech">+</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="info" @click="addDraft">保存到草稿箱</el-button>
      <el-button type="primary" @click="createProject">创建</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ProjectDraft } from '@/store/project.module';
import { projectStore } from '@/store';
import { DevelopingStack, BusinessType } from '@/static';
import agent from '../agent';

const formInit = () => ({
  project_id: '',
  project_name: '',
  client_info: '',
  start_time: '',
  end_time: '',
  technology: [],
  business: [],
  member_list: [],
});

@Component
export default class ProjectCreateDialog extends Vue {
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;
  @Prop({ required: true }) onAddDraft!: (form: ProjectDraft) => void;
  @Prop({ required: true }) onCreateProject!: (form: ProjectDraft) => boolean;
  businessTags = [];
  newBusinessTag = '';
  technologyTags = [];
  newTechTag = '';
  members = [];
  memberListVisible = false;
  // businessType = BusinessType.map((i) => ({ label: i, value: i }));
  // developingStack = DevelopingStack.map((i) => ({ label: i, value: i }));
  treeParams = {
    clickParent: false,
    filterable: false,
    props: {
      children: 'children',
      label: 'label',
      value: 'value',
      disabled: 'disabled',
    },
  };

  form = formInit();
  async mounted() {
    const members = await agent.member.getAll();
    this.members = members.member_list.filter(a => {
      return a.job == 5;
    });
  }
  @Watch('visible')
  onOpen() {
    if (this.visible) {
      this.form = formInit();
    }
    projectStore.setCurrentDraft(null);
  }
  handleSelectionChange(val) {
    this.form.member_list = val.map(a=>a.member_id);
  }
  addBusiness() {
    if(this.newBusinessTag != '') {
      this.businessTags.push(this.newBusinessTag);
      this.newBusinessTag=``
    }
  }
  addTech() {
    if(this.newTechTag != '') {
      this.technologyTags.push(this.newTechTag);
      this.newTechTag=``
    }
  }
  addDraft() {
    this.onClose();
    this.onAddDraft(this.form);
  }
  async createProject() {
    this.form.business = this.businessTags;
    this.form.technology = this.technologyTags;
    const result = this.onCreateProject(this.form);
    if (result) {
      this.onClose();
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 300px;
}
.el-select {
  width: 300px;
}
</style>
