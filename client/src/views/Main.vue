<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="setCount(count + 1)">add</button>
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
import { mapState } from 'vuex';

@Component({
  computed: mapState({
    projectInfo: 'info',
    count: 'count'
  })
})
export default class Main extends Vue {
  projectInfo!: any;
  count!: number;

  setCount(val: number) {
    this.$store.commit('modifyCount', val);
  }
  mounted() {
    if (this.projectInfo) return;
    fetch('/api')
      .then(res => res.json())
      .then(result => {
        this.$store.dispatch('setInfo', result);
      });
  }
}
</script>

<style scoped></style>
