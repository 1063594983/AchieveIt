<template>
  <el-scrollbar wrap-class="el-scrollbar-wrapper">
    <el-menu mode="vertical" :default-active="$route.name" @select="handleSelect">
      <sidebar-item :menu="menuList"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarItem from '@/components/SidebarItem.vue';
import { menu } from '@/router';

@Component({
  components: { SidebarItem }
})
export default class Sidebar extends Vue {
  menuList = menu;

  handleSelect(index: string) {
    if (this.$router.currentRoute.name !== index) this.$router.push({ name: index });
  }
}
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: 100vh;
}
.el-menu {
  border-right: none;
}
</style>
