import Task from './task'

function generatePrimaryKey() {
  const now = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${now}${randomNumber}`;
}

function task() {
  return new Task();
}

export {
  generatePrimaryKey,
  task,
}