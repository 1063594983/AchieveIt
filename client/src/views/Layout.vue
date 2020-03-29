<template>
  <div class="wrapper">
    <el-container>
      <el-header>
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
@Component({
  components: { Sidebar, Navbar }
})
export default class Layout extends Vue {}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  min-width: 700px;

  & > .el-container {
    height: 100vh;
    overflow: hidden;
  }
}

.el-header {
  padding: 0;
}
</style>
