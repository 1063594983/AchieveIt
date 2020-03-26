<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.name">
        <span v-if="index === levelList.length - 1">
          {{ item.meta.title || item.name }}
        </span>
        <router-link v-else :to="{ name: item.name }">
          {{ item.meta.title || item.name }}
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';

@Component
export default class Breadcrumb extends Vue {
  levelList: RouteRecord[] = [];

  @Watch('$route')
  onRouteChange() {
    this.getBreadcrumb();
  }

  created() {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    this.levelList = this.$route.matched.filter(item => item.name);
  }
}
</script>

<style scoped></style>
