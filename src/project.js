export function projectGenerate(name, tasks) {
  function addTask(task) {
    this.tasks.push(task);
  }
  function deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  projects.push(this);
  return { name, tasks, addTask, deleteTask };
}
const projects = [];

