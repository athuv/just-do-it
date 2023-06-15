import { format } from 'date-fns';

export default class Project {
  static #instance;
  static #projects = [];

  constructor() {
    if(Project.#instance){
      return Project.#instance;
    }
    Project.#instance = this;
  }

  #generatePrimaryKey() {
    const now = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${now}${randomNumber}`;
  }

  getProject() {
    return Project.#projects;
  }

  createProject(projectName) {
    const newProject = {
      id: this.#generatePrimaryKey(),
      name: projectName,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    return Project.#projects.push(newProject);
  }

  renameProject(projectId, newProjectName) {
    const projectResult = Project.#projects.find(project => project.id === projectId);
    if(projectResult){
      projectResult.name = newProjectName;
      projectResult.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      return true;
    }else{
      return false;
    }
  }

  deleteProject(projectId) {
    const projectsArrayindex = Project.#projects.findIndex(item => item.id === projectId);
    if (projectsArrayindex !== -1) {
      Project.#projects.splice(projectsArrayindex, 1);
      return true;
    }
    
    return false;    
  }
}