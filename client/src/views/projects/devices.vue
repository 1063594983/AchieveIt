<template>
  <div>
    <h1>设备管理</h1>
    <el-table :data="deviceList">
      <el-table-column label="ID" prop="device_id" width="100px"></el-table-column>
      <el-table-column label="名称" prop="device_name"></el-table-column>
      <el-table-column label="可用性">
        <template slot-scope="scope">
          <el-tag :type="scope.row.device_status === 1 ? 'success' : 'info'">{{
            scope.row.device_status === 1 ? '可用' : '不可用'
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';
import { Device } from 'achieve-it-contract';

@Component
export default class Devices extends Vue {
  deviceList: Device[] = [];
  async mounted() {
    const result = await agent.device.getAll();
    this.deviceList = result.device_list;
  }
}
</script>

<style scoped></style>
