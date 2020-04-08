<template>
  <div>
    <el-button @click="dialogVisible = true">添加新的工时记录</el-button>
    <work-time-create-dialog
      :visible="dialogVisible"
      :on-close="closeDialog"
      :on-create="newRecord"
    ></work-time-create-dialog>
    <el-table border :data="computedRecords" class="mt2">
      <el-table-column prop="project_id" label="项目ID"> </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="180"> </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="180"> </el-table-column>
      <el-table-column prop="activity_content" label="工作内容"> </el-table-column>
      <el-table-column
        prop="tag"
        label="处理状态"
        width="100"
        :filters="[
          { text: '审批中', value: '审批中' },
          { text: '已完成', value: '已完成' },
        ]"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '审批中' ? 'primary' : 'success'">{{ scope.row.tag }}</el-tag>
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
export default {
  components: { WorkTimeCreateDialog },
  data() {
    return {
      dialogVisible: false,
      records: [],
    };
  },
  computed: {
    computedRecords() {
      return this.records.map((i) => ({
        ...i,
        start_time: dayjs(i.start_time).format('YYYY年MM月DD日 HH:mm:ss'),
        end_time: dayjs(i.end_time).format('YYYY年MM月DD日 HH:mm:ss'),
        tag: '已完成',
      }));
    },
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    async newRecord(record) {
      try {
        await agent.workTime.insert(userStore.currentUser.member_id, record);
        this.records = [record, ...this.records];
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  async mounted() {
    const result = await agent.workTime.ofMember(userStore.currentUser.member_id);
    this.records = result.work_time_list;
  },
};
</script>
