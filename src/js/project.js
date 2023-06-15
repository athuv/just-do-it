import { format } from 'date-fns';
import { generatePrimaryKey } from './utils';

export default class Project {
  static #instance;
  static #projects = [];

  constructor() {
    if(Project.#instance){
      return Project.#instance;
    }
    Project.#instance = this;
  }

  getProject() {
    const projects = localStorage.getItem("projects");
    if(projects) {
      Project.#projects = JSON.parse(projects);
    }

    return Project.#projects;
  }

  createProject(projectName) {
    const newProject = {
      id: parseInt(generatePrimaryKey()),
      name: projectName,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    Project.#projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(Project.#projects));
    return true;
  }

  renameProject(projectId, newProjectName) {
    const projectResult = Project.#projects.find(project => project.id === projectId);
    if(projectResult){
      projectResult.name = newProjectName;
      projectResult.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      localStorage.setItem('projects', JSON.stringify(Project.#projects));

      return true;
    }else{
      return false;
    }
  }

  deleteProject(projectId) {
    const projectsArrayindex = Project.#projects.findIndex(item => item.id === projectId);
    if (projectsArrayindex !== -1) {
      Project.#projects.splice(projectsArrayindex, 1);
      localStorage.setItem('projects', JSON.stringify(Project.#projects));
      return true;
    }
    
    return false;    
  }

  getProjectbyId(projectId) {
    const projectResult = Project.#projects.find(project => project.id === projectId);
    if(projectResult){

      return projectResult;
    }

    return false
  }
}