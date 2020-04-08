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
          <el-option
            v-for="item in projects"
            :key="item.project_id"
            :label="`${item.project_name} (${item.project_id})`"
            :value="item.project_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-select v-model="form.feature_id" placeholder="请选择">
          <el-option
            v-for="item in features"
            :key="item.function_id"
            :label="item.function_name"
            :value="item.function_id"
          ></el-option>
        </el-select>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Feature, Project, WorkTimePostBody } from 'achieve-it-contract';
import { Subtract } from 'utility-types';
import agent, { authBody } from '@/agent';
import { userStore } from '@/store';

type WorkTimeDraft = Subtract<WorkTimePostBody, authBody>;
@Component
export default class ProjectCreateDialog extends Vue {
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;
  @Prop({ required: true }) onCreate!: (record: WorkTimeDraft) => Promise<boolean>;

  projects: Project[] = [];
  features: Feature[] = [];

  @Watch('form.project_id')
  async onProjectSelected() {
    const result = await agent.feature.getFeatureList(this.form.project_id);
    console.log(result);
    this.features = result.feature_list;
  }

  mounted() {
    agent.project.getAll().then((result) => {
      this.projects = result.project_list;
    });
  }

  form: WorkTimeDraft = {
    activity_content: '',
    end_time: '',
    feature_id: null,
    member_id: +userStore.currentUser.member_id,
    project_id: '',
    start_time: '',
  };

  async createWorkTime() {
    const result = await this.onCreate(this.form);
    if (result) {
      this.onClose();
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 300px;
}
</style>
