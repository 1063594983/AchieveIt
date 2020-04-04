<template>
  <div>
    <el-button @click="dialogVisible = true">添加新的工时记录</el-button>
    <work-time-create-dialog :visible="dialogVisible" :on-close="closeDialog"></work-time-create-dialog>
    <el-table ref="filterTable" border :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="detail" label="工作内容" :formatter="formatter"> </el-table-column>
      <el-table-column
        prop="tag"
        label="处理状态"
        width="100"
        :filters="[
          { text: '审批中', value: '审批中' },
          { text: '已完成', value: '已完成' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '审批中' ? 'primary' : 'success'" disable-transitions>{{
            scope.row.tag
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import WorkTimeCreateDialog from '@/components/WorkTimeCreateDialog';
export default {
  components: { WorkTimeCreateDialog },
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          detail: '开发一个什么山额么',
          tag: '审批中',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          detail: '开发一个什么山额么',
          tag: '审批中',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          detail: '开发一个什么山额么',
          tag: '已完成',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          detail: '开发一个什么山额么',
          tag: '已完成',
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.detail;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
  },
};
</script>
