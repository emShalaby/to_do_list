function task(title, description, duedate, priority) {
  return { title, description, duedate, priority };
}
function project(name, tasks) {
  function addTask(task) {
    this.tasks.push(task);
  }
  function deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  return { name, tasks, addTask, deleteTask };
}


