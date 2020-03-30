<template>
  <el-card shadow="hover">
    <div class="header-container">
      <h1>项目名称</h1>
      <span>两天前更新</span>
    </div>
    <h2>前端项前端项目前端项目前端项目前端项目目</h2>
    <div class="avatar-container">
      <el-avatar
        size="small"
        src="https://lh3.googleusercontent.com/proxy/2E_JBphH_18RF_rxm_amyvQbL9J1CMLBmUGCFVjUjrzb_BhLNNN0164UU09lBrjdFYl3s6fCnALC5JgAIzZ5bop8GtxLvVCIWVGtojF5D5hLK11JBnS9ziopuypudputFg"
      ></el-avatar>
      <el-avatar
        size="small"
        src="https://lh3.googleusercontent.com/proxy/2E_JBphH_18RF_rxm_amyvQbL9J1CMLBmUGCFVjUjrzb_BhLNNN0164UU09lBrjdFYl3s6fCnALC5JgAIzZ5bop8GtxLvVCIWVGtojF5D5hLK11JBnS9ziopuypudputFg"
      ></el-avatar>
    </div>
    <div class="bottom-container">
      <div class="status">申请中</div>
      <el-icon name="more"></el-icon>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProjectCard extends Vue {}
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 20px;
  h1 {
    margin: 0;
    font-size: 16px;
    > span {
      opacity: 0.5;
      font-size: 12px;
    }
  }
  h2 {
    margin: 4px 0 0 0;
    font-size: 14px;
    opacity: 0.7;
    font-weight: normal;
  }
  .avatar-container {
    margin-top: 20px;
    & > * {
      margin-right: 5px;
    }
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    & > span {
      opacity: 0.5;
      font-size: 12px;
    }
    margin-bottom: 20px;
  }
  .bottom-container {
    margin: 10px -10px -10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .status {
      opacity: 0.5;
      font-size: 14px;
    }
    i {
      opacity: 0.7;
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
