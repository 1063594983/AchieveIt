<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.name">
        <span
          v-if="item.redirect === 'noredirect' || index === levelList.length - 1"
          class="no-redirect"
          :class="{ current: index === levelList.length - 1 }"
        >
          {{ item.meta.title || item.name }}
        </span>
        <router-link v-else :to="{ name: item.name }">
          {{ item.meta.title || item.name }}
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div id="loading-container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Breadcrumb extends Vue {
  levelList: any = null;

  @Watch('$route')
  onRouteChange() {
    this.getBreadcrumb();
  }

  created() {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    let matched = this.$route.matched.filter(item => item.name);
    const first = matched[0];
    if (first && first.name !== 'welcome') {
      // matched = [
      //   {
      //     name: 'welcome',
      //     path: '/welcome',
      //     meta: { title: '首页' },
      //   },
      // ].concat(matched);
    } else {
      matched.shift();
    }
    this.levelList = matched;
  }
}
</script>

<style scoped></style>
