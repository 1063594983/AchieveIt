<template>
  <div>
    <h1>人员管理</h1>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { projectStore } from '@/store';
import agent from '@/agent';
import ProjectCreateDialog from '@/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/components/ProjectDraftBox.vue';
import { ProjectDraft } from '@/store/project.module';
import { Project, ResultCommon } from 'achieve-it-contract';
import { Notify } from '@/theme';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectEditDialog from '@/components/ProjectEditDialog.vue';
import { userStore } from '../../store';
import dayjs from 'dayjs';

@Component({
  components: { ProjectEditDialog, ProjectCard, ProjectDraftBox, ProjectCreateDialog },
})
export default class People extends Vue {
  async refresh() {
    
  }
  mounted() {
    this.refresh();
    
  }
}
</script>
