<template>
  <div>
    <h1>项目管理</h1>
    <pre>{{ JSON.stringify(form, null, 2) }}</pre>
    <pre>{{ projectDetail }}</pre>
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible = true">创建项目</el-button>

    <el-dialog title="创建项目" :visible.sync="dialogFormVisible" width="420px" :close-on-click-modal="false">
      <el-form :model="form" label-position="left" label-width="5rem">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目成员">
          <el-tree-select
            :styles="{ width: '300px' }"
            v-model="form.members"
            :selectParams="{ placeholder: '请选择项目成员', multiple: true }"
            :treeParams="treeParams"
            ref="treeSelect"
          />
        </el-form-item>
        <el-form-item label="项目开始">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="项目终止">
          <el-date-picker type="date" placeholder="终止日期" v-model="form.endDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option v-for="item in ['内部项目', '服务项目']" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="info">保存到草稿</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';

const memberData = [
  {
    value: '大哥类型的调查员',
    label: '大哥类型的调查员'
  },
  {
    value: '大团长',
    label: '大团长'
  },
  {
    value: '苍蓝星',
    label: '苍蓝星'
  },
  {
    value: 'aibo',
    label: 'aibo'
  },
  {
    value: '猫',
    label: '猫'
  }
];
@Component
export default class Projects extends Vue {
  projectDetail = 'loading...';
  dialogFormVisible = false;
  form = {
    name: '',
    type: '',
    members: [],
    startDate: '',
    endDate: ''
  };
  treeParams = {
    clickParent: false,
    filterable: false,
    props: {
      children: 'children',
      label: 'label',
      value: 'value',
      disabled: 'disabled'
    },
    data: memberData
  };
  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.project.get(123, { token: user.token });
    this.projectDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped></style>
