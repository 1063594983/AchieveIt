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
        <el-input v-model="form.project_id" placeholder="输入项目名称"></el-input>
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
      <el-form-item label="项目类型">
        <el-tree-select
          :styles="{ width: '300px' }"
          v-model="form.business"
          :selectParams="{ placeholder: '请选择项目类型', multiple: true }"
          :treeParams="{ ...treeParams, data: businessType }"
        />
      </el-form-item>
      <el-form-item label="技术框架">
        <el-tree-select
          :styles="{ width: '300px' }"
          v-model="form.technology"
          :selectParams="{ placeholder: '请选择基于的技术', multiple: true }"
          :treeParams="{ ...treeParams, data: developingStack }"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="info" @click="addDraft">保存到草稿</el-button>
      <el-button type="primary" @click="createProject">创建</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ProjectDraft } from '@/store/project.module';
import { projectStore } from '@/store';

const formInit = () => ({
  project_id: '',
  project_name: '',
  client_info: '',
  start_time: '',
  end_time: '',
  technology: [],
  business: []
});

@Component
export default class ProjectCreateDialog extends Vue {
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;
  @Prop({ required: true }) onAddDraft!: (form: ProjectDraft) => void;
  @Prop({ required: true }) onCreateProject!: (form: ProjectDraft) => boolean;

  businessType = ['企业内部管理', '技术框架开发', '面向客户软件'].map(i => ({ label: i, value: i }));
  developingStack = ['node.js', 'Vue.js', 'React.js', 'Java', 'Golang'].map(i => ({ label: i, value: i }));

  form: ProjectDraft = formInit();
  treeParams = {
    clickParent: false,
    filterable: false,
    props: {
      children: 'children',
      label: 'label',
      value: 'value',
      disabled: 'disabled'
    }
  };

  @Watch('visible')
  onOpen() {
    if (this.visible) {
      this.form = projectStore.currentDraft ?? formInit();
    }
    projectStore.setCurrentDraft(null);
  }

  addDraft() {
    this.onClose();
    this.onAddDraft(this.form);
  }
  createProject(form: ProjectDraft) {
    const result = this.onCreateProject(form);
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
