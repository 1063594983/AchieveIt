<template>
  <el-dialog
    title="修改工时记录"
    :visible.sync="visible"
    width="420px"
    :close-on-click-modal="false"
    :before-close="onClose"
  >
    <el-form :model="form" label-position="left" label-width="5rem" v-if="form">
      <el-form-item label="项目选择">
        <el-select v-model="form.project_id" placeholder="请选择">
          <el-option
            v-for="item in projects"
            :key="item.project_id"
            :label="`${item.project_id}(${item.project_name})`"
            :value="item.project_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能名称">
        <el-cascader v-model="form.feature_name" :options="features" placeholder="功能 / 子功能"></el-cascader>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-cascader v-model="form.activity_content" :options="activitys" placeholder="请选择活动"></el-cascader>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker placeholder="输入日期" v-model="form.date" :picker-options="pickerOptions"></el-date-picker>
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
      <el-button type="primary" @click="updateWorktime">提交</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Feature, Project, WorkTimePostBody } from 'achieve-it-contract';
import { Subtract } from 'utility-types';
import agent, { authBody } from '@/agent';
import { userStore } from '@/store';
import { Notify } from '../theme';
import dayjs from "dayjs";

// type WorkTimeDraft = Subtract<WorkTimePostBody, authBody>;

@Component
export default class WorkTimeUpdateDialog extends Vue {
  @Prop({ required: true }) visible!: boolean;
  @Prop({ required: true }) onClose!: () => void;
  @Prop({ required: true }) onUpdate!: (record) => Promise<boolean>;
  @Prop() currentRecord;

  projects: Project[] = [];
  features = null;
  activitys = null;
  form = null;

  @Watch('currentRecord')
  onRecordSelected() {
    this.form = {
      ...this.currentRecord,
      activity_content: this.currentRecord.activity_content.split("-"),
      feature_name: this.currentRecord.feature_name.split("-"),
    };
  }

  @Watch('form.project_id')
  async onProjectSelected() {
    const result = await agent.feature.getFeatureList(this.form.project_id);
    if (result.status == 'error') {
      this.features = null;
    } else {
      const features = result.feature_list;
      this.features = features.map((feature) => {
        return {
          value: feature.name,
          label: feature.name,
          children: feature.data[0].map((child) => {
            return {
              value: child,
              label: child,
            };
          }),
        };
      });
    }

    const activity = await agent.activity.ofProject(this.form.project_id);
    if (activity.data.status == 'error') {
      this.activitys = null;
    } else {
      const activitys = activity.data.activity_list;
      this.activitys = activitys.map((a) => {
        return {
          value: `${a.activity_name}(${a.activity_content})`,
          label: `${a.activity_name}(${a.activity_content})`,
        };
      });
    }
  }

  mounted() {
    agent.project.getJoinProjects(userStore.currentUser.member_id).then((result) => {
      // 筛选进行中的项目
      this.projects = result.project_list.filter((x) => x.status == '进行中');
    });
  }

  pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now() || time.getTime() < Date.now() - 3 * 24 * 60 * 60 * 1000;
    },
  };

  async updateWorktime() {
    if (new Date().valueOf() - new Date(this.form.date).valueOf() > 3 * 24 * 60 * 60 * 1000) {
      Notify.error('已超过三天不能添加');
    } else {
      // this.form.activity_content = this.form.activity_content[0];
      this.form.feature_name = `${this.form.feature_name[0]}-${this.form.feature_name[1]}`;
      const result = await this.onUpdate(this.form);
      if (result) {
        this.onClose();
      }
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 300px;
}
</style>
