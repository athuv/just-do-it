import { format } from 'date-fns';

export default class project {
  static #instance;
  static #projects = [];

  constructor() {
    if(project.#instance){
      return project.#instance;
    }
    project.#instance = this;
  }

  generatePrimaryKey() {
    const now = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${now}${randomNumber}`;
  }

  getProject() {
    return project.#projects;
  }

  setProject(projectName) {
    const newProject = {
      id: this.generatePrimaryKey(),
      name: projectName,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    return project.#projects.push(newProject);
  }

  renameProject(projectId, newProjectName) {
    const projectResult = project.#projects.find(project => project.id === projectId);
    if(projectResult){
      projectResult.name = newProjectName;
      projectResult.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      return true;
    }else{
      return false;
    }
  }

  deleteProject(projectId) {
    const projectsArrayindex = project.#projects.findIndex(item => item.id === projectId);
    if (projectsArrayindex !== -1) {
      project.#projects.splice(projectsArrayindex, 1);
      return true;
    }
    
    return false;    
  }
}