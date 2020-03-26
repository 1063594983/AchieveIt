<template>
  <div class="menu-item">
    <el-submenu v-for="item in menu" :index="item.name" :key="item.name">
      <template slot="title">
        <el-icon v-if="item.meta.icon" :name="item.meta.icon"></el-icon>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <el-menu-item v-for="child in item.children" :index="child.name" :key="child.name">
        <el-icon v-if="child.meta.icon" :name="child.meta.icon"></el-icon>
        <span slot="title">{{ child.meta.title }}</span>
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';

@Component
export default class SidebarItem extends Vue {
  @Prop({ default: () => [] }) menu!: RouteRecord[];
}
</script>

<style scoped></style>
