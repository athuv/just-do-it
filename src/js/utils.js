import Task from './task';
import Project from './project';

const projectInstance = new Project();
const taskInstance = new Task();


function generatePrimaryKey() {
  const now = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${now}${randomNumber}`;
}

function task() {
  return taskInstance; // Return the shared instance
}

function project() {
  return projectInstance;
}

export {
  generatePrimaryKey,
  project,
  task,  
}