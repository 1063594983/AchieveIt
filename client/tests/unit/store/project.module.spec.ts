import { projectStore } from '@/store';

describe('test project store', () => {
  const createForm = (name: string) => ({
    project_id: '',
    project_name: name,
    client_info: '',
    start_time: '',
    end_time: '',
    technology: [],
    business: []
  });
  beforeEach(() => {
    for (let i of projectStore.projectDrafts) {
      projectStore.removeProjectDraft(i);
    }
  });

  it('should addProjectDraft action correctly', async function() {
    await projectStore.addProjectDraft(createForm('xyy'));
    expect(projectStore.projectDrafts).toHaveLength(1);
    expect(projectStore.projectDrafts[0].project_name).toEqual('xyy');
  });

  it('should addProjectDraft action correctly when update the object', async function() {
    const form = createForm('xyy');
    await projectStore.addProjectDraft(form);
    form.project_name = 'xyz';
    expect(projectStore.projectDrafts).toHaveLength(1);
    expect(projectStore.projectDrafts[0].project_name).toEqual('xyz');
  });

  it('should removeProjectDraft action correctly', async function() {
    const form = createForm('xyy');
    await projectStore.removeProjectDraft(form);
    expect(projectStore.projectDrafts).toHaveLength(0);
  });

  it('should removeProjectDraft action correct when target not existed', async function() {
    const form = createForm('xyy');
    const form2 = createForm('xyz');
    await projectStore.addProjectDraft(form);
    await projectStore.removeProjectDraft(form2);
    expect(projectStore.projectDrafts).toHaveLength(1);
  });

  it('should setCurrentDraft action correctly', async function() {
    const form = createForm('xyy');
    await projectStore.setCurrentDraft(form);
    expect(projectStore.currentDraft).toEqual(form);
  });
});
