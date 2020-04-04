<template>
  <el-dialog
    title="新建工时记录"
    :visible.sync="visible"
    width="420px"
    :close-on-click-modal="false"
    :before-close="onClose"
  >
    <el-form :model="form" label-position="left" label-width="5rem">
      <el-form-item label="项目选择">
        <el-select v-model="form.project_id" placeholder="请选择">
          <el-option v-for="item in projects" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input v-model="form.activity_content" placeholder="输入正在进行的活动"></el-input>
      </el-form-item>
      <el-form-item label="工作详情">
        <el-input type="textarea" v-model="form.activity_content" placeholder="输入工作详情"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-time-picker placeholder="输入开始时间" v-model="form.start_time"></el-time-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-time-picker type="time" placeholder="输入结束时间" v-model="form.end_time"></el-time-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="createWorkTime">创建</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WorkTimePostBody } from 'achieve-it-contract';
import { Subtract } from 'utility-types';
import { authBody } from '@/agent';
import { projectStore } from '@/store';

type WorkTimeDraft = Subtract<WorkTimePostBody, authBody>;
@Component
export default class ProjectCreateDialog extends Vue {
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;

  get projects() {
    return projectStore.projects;
  }

  form: WorkTimeDraft = {
    activity_content: '',
    end_time: '',
    feature_id: 0,
    member_id: 0,
    project_id: '',
    start_time: '',
  };

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

  createWorkTime(form: WorkTimeDraft) {}
}
</script>

<style scoped>
  .el-select {
    width: 300px;
  }
</style>
