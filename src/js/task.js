import { format, addDays, isWithinInterval } from 'date-fns';
import { generatePrimaryKey } from './utils';

export default class Task {
  static #instance;
  static #tasks = [];

  constructor() {
    if(Task.#instance){
      return Task.#instance;
    }
    Task.#instance = this;
  }

  fetchTask() {
    const tasks = localStorage.getItem("tasks");
    if(tasks) {
      Task.#tasks = JSON.parse(tasks);
    }
  }

  getTask() {
    this.fetchTask();
    return Task.#tasks;
  }

  createTask(taskName, projectId, taskDescription, taskDueDate, taskPriority) {
    const newTask = {
      id: parseInt(generatePrimaryKey()),      
      name: taskName,
      projectId: projectId,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    Task.#tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(Task.#tasks));
    return true;
  }

  updateTask(taskId, taskName, projectId, taskDescription, taskDueDate, taskPriority) {
    const taskResult = Task.#tasks.find(task => task.id === taskId);
    if(taskResult){
      taskResult.projectId = projectId,
      taskResult.name = taskName;
      taskResult.description = taskDescription;
      taskResult.dueDate = taskDueDate;
      taskResult.priority = taskPriority;
      taskResult.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      localStorage.setItem('tasks', JSON.stringify(Task.#tasks));
      return true;
    }else{
      return false;
    }
  }

  deleteTask(taskId) {
    const tasksArrayindex = Task.#tasks.findIndex(item => item.id === taskId);
    if (tasksArrayindex !== -1) {
      Task.#tasks.splice(tasksArrayindex, 1);
      localStorage.setItem('tasks', JSON.stringify(Task.#tasks));
      return true;
    }
    
    return false;    
  }

  todayTasks() {
    this.fetchTask();
    const todayTasks = Task.#tasks.filter(item => item.dueDate === format(new Date(), 'yyyy-MM-dd'));
    return todayTasks;
  }

  nextSevenDayTasks() {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    this.fetchTask();

    const nextSevenDayTasks = Task.#tasks.filter(task => {
      const taskDueDate = new Date(task.dueDate);
      return isWithinInterval(taskDueDate, { start: today, end: nextWeek });
    });

    return nextSevenDayTasks;
  }

  getTaskById(taskId) {
    this.fetchTask();
    const taskResult = Task.#tasks.find(task => task.id === taskId);
    if(taskResult){

      return taskResult;
    }

    return false;
  }

  getTaskByProjectId(projectId) {
    const taskResult = Task.#tasks.filter((task) => task.projectId === projectId);
    if(taskResult){
      return taskResult;
    }

    return false
  }
}