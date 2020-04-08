import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

export interface ProjectDraft {
  project_id: string;
  project_name: string;
  client_info: string;
  start_time: string;
  end_time: string;
  technology: string[];
  business: string[];
}

@Module({ name: 'project' })
export default class ProjectModule extends VuexModule {
  projectDrafts: ProjectDraft[] = [];
  currentDraft: ProjectDraft | null = null;

  @Mutation
  addProjectDraft(project: ProjectDraft) {
    if (!this.projectDrafts.includes(project)) {
      this.projectDrafts.push(project);
    }
  }

  @Mutation
  removeProjectDraft(project: ProjectDraft) {
    this.projectDrafts = this.projectDrafts.filter((i) => i !== project);
  }

  @Mutation
  setCurrentDraft(project: ProjectDraft | null) {
    this.currentDraft = project;
  }
}
