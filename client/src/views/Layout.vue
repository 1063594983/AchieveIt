<template>
  <div class="wrapper">
    <el-container>
      <el-header v-once :style="`background-color: ${bgColor}`">
        <navbar></navbar>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <sidebar></sidebar>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { commonStore } from '@/store';

@Component({
  components: { Sidebar, Navbar },
})
export default class Layout extends Vue {
  get bgColor() {
    return commonStore.isDarkMode ? '#222933' : 'white';
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  min-width: 700px;
  height: 100vh;

  .el-header {
    padding: 0;
    z-index: 1000;
    position: fixed;
    left: 0;
    right: 0;
  }

  .el-main {
    padding-top: 80px;
    padding-left: 240px;
  }

  .el-aside {
    border-right: 1px solid rgba(128, 128, 128, 0.06);
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    height: 100%;
  }
}
</style>
