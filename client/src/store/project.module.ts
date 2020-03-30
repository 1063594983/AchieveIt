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

  @Mutation
  addProjectDraft(project: ProjectDraft) {
    this.projectDrafts.push(project);
  }

  @Mutation
  removeProjectDraft(project: ProjectDraft) {
    this.projectDrafts = this.projectDrafts.filter(i => i !== project);
  }
}
