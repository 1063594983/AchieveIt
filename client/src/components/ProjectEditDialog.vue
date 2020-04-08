<template>
  <el-dialog
    title="编辑项目"
    :visible.sync="visible"
    width="420px"
    :close-on-click-modal="false"
    :before-close="onClose"
  >
    <el-form :model="form" label-position="left" label-width="5rem">
      <el-form-item label="名称">
        <el-input v-model="form.project_name" placeholder="输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="客户主体">
        <el-input v-model="form.client_info" placeholder="输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="项目开始">
        <el-date-picker
          type="date"
          value-format="yyyy-MM-ddTHH:mm"
          placeholder="开始日期"
          v-model="form.start_time"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目终止">
        <el-date-picker
          type="date"
          value-format="yyyy-MM-ddTHH:mm"
          placeholder="终止日期"
          v-model="form.end_time"
        ></el-date-picker>
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
      <el-button @click="onClose" :loading="isLoading">取消</el-button>
      <el-button type="primary" @click="onUpdate" :loading="isLoading">更新</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Project, ProjectPutBBody } from 'achieve-it-contract';
import { userStore } from '@/store';
import { DevelopingStack, BusinessType } from '@/static';

@Component
export default class ProjectEditDialog extends Vue {
  @Prop({ required: true }) project!: Project;
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;
  @Prop({ required: true }) onEdit!: (project: Project, newProject: ProjectPutBBody) => Promise<boolean>;

  isLoading = false;
  businessType = BusinessType.map((i) => ({ label: i, value: i }));
  developingStack = DevelopingStack.map((i) => ({ label: i, value: i }));
  treeParams = {
    clickParent: false,
    filterable: false,
    props: {
      children: 'children',
      label: 'label',
      value: 'value',
      disabled: 'disabled',
      key: 'label',
    },
  };

  form: ProjectPutBBody = {
    business: [],
    client_info: '',
    end_time: '',
    important_events: [],
    manager: 0,
    project_name: '',
    start_time: '',
    status: 0,
    technology: [],
    token: '',
  };

  @Watch('project')
  onTargetChange() {
    if (this.project) {
      this.form = {
        business: [...this.project.business],
        client_info: this.project.client_info,
        end_time: this.project.end_time,
        important_events: this.project.important_events,
        manager: this.project.manager,
        project_name: this.project.project_name,
        start_time: this.project.start_time,
        status: 0,
        technology: [...this.project.technology],
        token: '',
      };
    }
  }
  async onUpdate() {
    this.form.token = userStore.currentUser.token;
    this.isLoading = true;
    const result = await this.onEdit(this.project, this.form);
    this.isLoading = false;
    if (result) {
      this.onClose();
    }
  }
}
</script>

<style scoped></style>
