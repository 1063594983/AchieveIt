<template>
  <el-table
    border
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <el-table-column label="Date" prop="date"> </el-table-column>
    <el-table-column label="Name" prop="name"> </el-table-column>
    <el-table-column align="right" width="234px">
      <template slot="header">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
        <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2020-05-02',
          name: '一个简单的项目'
        },
        {
          date: '2020-05-04',
          name: '另一个简单的项目'
        },
        {
          date: '2020-05-01',
          name: '一个复杂的项目'
        },
        {
          date: '2020-05-03',
          name: '另一个复杂的项目'
        }
      ],
      search: ''
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
