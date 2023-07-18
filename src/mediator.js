import deleteImg from "./trash-icon.png";
import projectImg from "./icons8-project-30.png";

export function projectToDOM(project) {
  const menuLi = document.createElement("li");
  const h3 = document.createElement("h3");
  const projectIcon = new Image();
  const deleteIcon = new Image();
  const projectView = document.createElement("div");
  const projectHeader = document.createElement("div");
  const projectMain = document.createElement("div");
  const h1 = document.createElement("h1");
  const taskList = document.createElement("ul");
  const name = project.name;
  h3.textContent = project.name;
  deleteIcon.src = deleteImg;
  projectIcon.src = projectImg;
  menuLi.id = "menu-" + project.name;
  projectIcon.classList.add("project-icon");
  deleteIcon.classList.add("delete-icon");
  projectView.classList.add("project-view");
  projectHeader.classList.add("view-project-header");
  projectMain.classList.add("project-main");
  taskList.id = "view-task-list";
  menuLi.append(projectIcon, h3, deleteIcon);

  h1.textContent = project.name;
  projectView.append(projectHeader, projectMain);

  project.tasks.forEach((task) => {
    const taskElems = taskToDOM(task);
    const taskElement = taskElems.taskLi;
    taskList.append(taskElement);
    const taskDeleteIcon = taskElems.deleteIcon;
    const checkIcon = taskElems.checkIcon;
    taskDeleteIcon.addEventListener("click", () => {
      taskElement.remove();
      project.deleteTask(task);
      deleteStoredtask(project, task);
    });
    checkIcon.addEventListener("click", () => {
      taskElement.remove();
      project.deleteTask(task);
      deleteStoredtask(project, task);
    });
  });
  projectMain.appendChild(taskList);
  projectHeader.appendChild(h1);

  return {
    menuLi,
    projectView,
    deleteIcon,
    projectMain,
    projectIcon,
    taskList,
    name,
  };
}

export function taskToDOM(task) {
  const taskLi = document.createElement("li");
  const taskName = document.createElement("h4");
  const taskDescription = document.createElement("h5");
  const dueDate = document.createElement("h6");
  const deleteIcon = new Image();
  const checkIcon = document.createElement("div");

  checkIcon.classList.add("check-icon");
  deleteIcon.src = deleteImg;
  deleteIcon.classList.add("delete-icon");
  taskName.textContent = task.title;
  taskLi.append(checkIcon);
  taskLi.append(taskName);
  taskDescription.textContent = task.description;
  taskLi.append(taskDescription);
  dueDate.textContent = task.duedate;
  taskLi.append(dueDate);
  taskLi.append(deleteIcon);
  return { taskLi, deleteIcon, checkIcon };
}
