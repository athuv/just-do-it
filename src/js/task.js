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

  getTask() {
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
    return Task.#tasks.push(newTask);
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
      return true;
    }else{
      return false;
    }
  }

  deleteTask(taskId) {
    const tasksArrayindex = Task.#tasks.findIndex(item => item.id === taskId);
    if (tasksArrayindex !== -1) {
      Task.#tasks.splice(tasksArrayindex, 1);
      return true;
    }
    
    return false;    
  }

  todayTasks() {
    const todayTasks = Task.#tasks.filter(item => item.dueDate === format(new Date(), 'yyyy-MM-dd'));
    return todayTasks;
  }

  nextSevenDayTasks() {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    const nextSevenDayTasks = Task.#tasks.filter(task => {
      const taskDueDate = new Date(task.dueDate);
      return isWithinInterval(taskDueDate, { start: today, end: nextWeek });
    });

    return nextSevenDayTasks;
  }

  getTaskByProjectId(projectId) {
    const taskResult = Task.#tasks.filter((task) => task.projectId === projectId);
    if(taskResult){
      return taskResult;
    }

    return false
  }
}