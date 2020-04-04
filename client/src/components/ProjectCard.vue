<template>
  <el-card shadow="hover" class="mt2">
    <div class="flex justify-between items-center">
      <div class="bold">项目名称</div>
      <div class="h6 opacity">两天前更新</div>
    </div>
    <div class="my2 h5">前端项前端项目前端项目前端项目前端项目目</div>

    <div class="flex justify-between items-center mt3">
      <el-tag>申请中</el-tag>
      <div class="flex items-center">
        <img class="avatar circle mr1" alt="avatar" src="../assets/img/profile.jpg" />
        <img class="avatar circle mr1" alt="avatar" src="../assets/img/profile.jpg" />
        <el-icon name="more" class="ml1 opacity"></el-icon>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProjectCard extends Vue {}
</script>

<style scoped lang="scss">
.avatar {
  width: 28px;
  height: 28px;
}
</style>
