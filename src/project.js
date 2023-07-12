import { storeProjects } from "./storage.js";
export function projectGenerate(name, tasks) {
  function addTask(task) {
    this.tasks.push(task);
  }
  function deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  storeProjects({ name, tasks });
  return { name, tasks, addTask, deleteTask };
}
