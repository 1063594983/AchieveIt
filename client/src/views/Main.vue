<template>
  <div>
    <h1>{{ count }}</h1>
    <el-button @click="handleAdd">add</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonState } from '../store';

@Component
export default class Main extends Vue {
  get count() {
    return commonState.count;
  }

  handleAdd() {
    commonState.modifyCount(count => count + 1);
  }
}
</script>

<style scoped></style>
