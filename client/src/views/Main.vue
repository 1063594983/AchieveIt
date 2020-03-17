<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="handleAdd">add</button>
    <div v-if="projectInfo">
      <h1>{{ projectInfo.project }}</h1>
      <ul>
        <li v-for="member in projectInfo.members">{{ member }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { commonState } from '../store';

@Component
export default class Main extends Vue {
  get projectInfo() {
    return commonState.info;
  }
  get count() {
    return commonState.count;
  }

  handleAdd() {
    commonState.modifyCount(count => count + 1);
  }

  mounted() {
    if (this.projectInfo) return;
    fetch('/api')
      .then(res => res.json())
      .then(result => {
        commonState.modifyInfo(result);
      });
  }
}
</script>

<style scoped></style>
