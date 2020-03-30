<template>
  <div>
    <el-button @click="dialogFormVisible = true">创建项目</el-button>
    <el-button @click="draftBoxVisible = true">打开草稿箱</el-button>
    <pre>{{ projectDetail }}</pre>
    <project-create-dialog :visible="dialogFormVisible" :on-close="onCloseDialog"></project-create-dialog>
    <project-draft-box :visible="draftBoxVisible" :on-close="onCloseDraft"></project-draft-box>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';
import agent from '@/agent';
import ProjectCreateDialog from '@/views/projects/components/ProjectCreateDialog.vue';
import ProjectDraftBox from '@/views/projects/components/ProjectDraftBox.vue';

@Component({
  components: { ProjectDraftBox, ProjectCreateDialog }
})
export default class Projects extends Vue {
  projectDetail = 'loading...';
  dialogFormVisible = false;
  draftBoxVisible = false;

  onCloseDialog() {
    this.dialogFormVisible = false;
  }
  onCloseDraft() {
    this.draftBoxVisible = false;
  }

  async mounted() {
    const user = userStore.currentUser!;
    const result = await agent.project.get('20200329A', { token: user.token });
    this.projectDetail = JSON.stringify(result, null, 2);
  }
}
</script>

<style scoped></style>
