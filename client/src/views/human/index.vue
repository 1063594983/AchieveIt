<template>
  <div>
    <h1>工时管理</h1>
    <div class="flex items-center justify-between">
      <el-button @click="dialogsVisible.create = true" v-if="userStore.member.job != '项目上级'"
        >添加新的工时记录</el-button
      >
    </div>
    <work-time-create-dialog
      :visible="dialogsVisible.create"
      :on-close="closeDialog"
      :on-create="newRecord"
    ></work-time-create-dialog>
    <work-time-update-dialog
      :visible="dialogsVisible.update"
      :on-close="closeDialog"
      :on-update="updateRecord"
      :currentRecord="dialogsVisible.updateSelect"
    ></work-time-update-dialog>
    <el-table border :data="computedRecords" class="mt2">
      <el-table-column prop="project_id" label="项目ID"> </el-table-column>
      <el-table-column
        prop="member_id"
        label="员工ID"
        width="100"
        v-if="userStore.member.job == '项目上级'"
      ></el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="180"> </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="180"> </el-table-column>
      <el-table-column prop="feature_name" label="项目功能"> </el-table-column>
      <el-table-column prop="activity_content" label="工作内容"> </el-table-column>
      <el-table-column
        prop="status"
        label="处理状态"
        width="160"
        :filters="[
          { text: '审批中', value: 0 },
          { text: '已完成', value: 1 },
        ]"
        filter-placement="bottom-end"
        v-if="userStore.member.job !== '项目上级'"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 0 ? 'primary' : 'success'">{{
            scope.row.status == 0 ? '审批中' : '已完成'
          }}</el-tag>
          <el-button
            :disabled="scope.row.status === 1"
            type="text"
            class="ml3"
            @click="
              () => {
                dialogsVisible.update = true;
                dialogsVisible.updateSelect = scope.row;
              }
            "
            >修改</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" v-else>
        <template slot-scope="scope">
          <el-button @click="checkWorkTime(scope.row.work_time_id)">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import WorkTimeCreateDialog from '@/components/WorkTimeCreateDialog';
import agent from '../../agent';
import { userStore } from '../../store';
import dayjs from 'dayjs';
import { Notify } from '../../theme';
import WorkTimeUpdateDialog from '../../components/WorkTimeUpdateDialog';
export default {
  components: { WorkTimeUpdateDialog, WorkTimeCreateDialog },
  data() {
    return {
      dialogsVisible: {
        update: false,
        updateSelect: null,
        create: false,
      },
      records: [],
      activitys: [],
      selectedProject: '',
      userStore,
    };
  },
  computed: {
    computedRecords() {
      return this.records.map((i) => ({
        ...i,
        start_time: dayjs(i.start_time).format('YYYY年MM月DD日 HH:mm:ss'),
        end_time: dayjs(i.end_time).format('YYYY年MM月DD日 HH:mm:ss'),
      }));
    },
  },
  methods: {
    async refresh() {
      // 如果是普通员工
      if (userStore.member.job == '普通员工') {
        // 获得自己的工时情况
        const result = await agent.workTime.ofMember(userStore.currentUser.member_id);
        this.records = result.work_time_list;
      } else {
        //  如果是项目上级
        // 获得所有员工的工时情况并审核
        const result = await agent.workTime.getAll();
        // 筛选待审核的workTime
        this.records = result.work_time_list.filter((x) => x.status == 0);
      }
    },
    closeDialog() {
      this.dialogsVisible.create = false;
      this.dialogsVisible.update = false;
    },
    async updateRecord(record) {
      try {
        await agent.workTime.update(record.work_time_id, record);
        // this.records = [record, ...this.records];
        this.refresh();
        return true;
      } catch (e) {
        return false;
      }
    },
    async newRecord(record) {
      try {
        await agent.workTime.insert(userStore.currentUser.member_id, record);
        // this.records = [record, ...this.records];
        this.refresh();
        return true;
      } catch (e) {
        return false;
      }
    },
    // 审核通过workTime
    checkWorkTime(work_time_id) {
      agent.workTime.check(work_time_id).then((_) => {
        this.refresh();
        Notify.success('成功', '审核完成');
      });
    },
  },

  mounted() {
    this.refresh();
  },
};
</script>
