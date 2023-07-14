import addImg from "./172525_plus_icon.svg";
import editImg from "./three-dots-punctuation-sign-svgrepo-com.svg";
import projectImg from "./icons8-project-30.png";
import deleteImg from "./trash-icon.png";
import { getProjects } from "./storage";
import { projectGenerate } from "./project";
import { storeProjects } from "./storage";
import { deleteProjects } from "./storage";
import { getProjectByName } from "./storage";
import { taskGenerate } from "./task.js";

let activeProjectName = "";
export function pageLoad() {
  headerLoad();
  mainLoad();
  footerLoad();
  menuLoad();
  viewLoad();
  updatePage();
  newProjectModal();
}

// website header

function headerLoad() {
  const header = document.createElement("div");
  const h1 = document.createElement("h1");
  const content = document.querySelector("#content");

  h1.textContent = "TO DO LIST";
  h1.id = "website-title";
  header.id = "header";

  content.appendChild(header);
  header.appendChild(h1);
}

// website main

function mainLoad() {
  const main = document.createElement("div");

  const content = document.querySelector("#content");
  const projects = getProjects();
  projects.forEach((proj) => projectToDOM(proj));

  main.id = "main";

  content.appendChild(main);
}

//website footer

function footerLoad() {
  const footer = document.createElement("div");
  const content = document.querySelector("#content");
  footer.id = "footer";
  content.appendChild(footer);
}

// side menu inside main

function menuLoad() {
  const menu = document.createElement("div");
  const menuProjects = document.createElement("div");
  const menuTasks = document.createElement("div");
  const ul = document.createElement("ul");
  const projectsHeader = document.createElement("div");
  const newProjectDiv = document.createElement("div");
  const h5 = document.createElement("h5");
  const img = new Image();
  const main = document.querySelector("#main");

  menu.id = "menu";
  menuProjects.id = "menu-projects";
  menuTasks.id = "menu-tasks";
  h5.id = "projects-title";
  h5.textContent = "Projects";
  ul.id = "menu-project-list";
  projectsHeader.id = "menu-projects-header";
  img.src = addImg;
  newProjectDiv.id = "new-project";

  menuProjects.appendChild(ul);
  main.prepend(menu);
  menu.appendChild(menuProjects);
  menuProjects.prepend(projectsHeader);
  projectsHeader.appendChild(h5);
  projectsHeader.appendChild(newProjectDiv);
  newProjectDiv.appendChild(img);

  newProjectDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    const modal = document.querySelector("#new-project-modal");
    modal.style.display = "flex";
  });
}

// //right view area inside main

function viewLoad() {
  const view = document.createElement("div");
  const header = document.createElement("div");
  const main = document.querySelector("#main");
  const menuProjectsHeader = document.querySelector("#menu-projects-header");
  const h1 = document.createElement("h1");

  view.id = "view";
  header.appendChild(h1);
  main.appendChild(view);
  menuProjectsHeader.addEventListener("click", () => {
    view.innerHTML = "";
    view.append(header);
    h1.textContent = "Projects";
    header.classList.add("view-project-header");
  });
}

//modal for adding a new project

function newProjectModal() {
  const modal = document.createElement("div");
  const input = document.createElement("input");
  const submitBtn = document.createElement("button");
  const label = document.createElement("label");

  modal.id = "new-project-modal";
  input.id = "new-project-name";
  input.type = "text";
  input.name = "new-project-name";
  submitBtn.type = "submit";
  submitBtn.id = "new-project-submit";
  submitBtn.textContent = "Create";
  label.for = input.name;
  label.innerHTML = "<b>Name</b>";

  modal.appendChild(label);
  modal.appendChild(input);
  modal.appendChild(submitBtn);
  content.appendChild(modal);
  modal.style.display = "none";

  submitBtn.addEventListener("click", () => {
    storeProjects(projectGenerate(input.value, []));
    modal.style.display = "none";
    updatePage();
  });
}

function viewTaskEditor() {
  const taskEditor = document.createElement("div");
  const taskName = document.createElement("input");
  const taskDescription = document.createElement("input");
  const dueDate = document.createElement("button");
  const priority = document.createElement("button");
  const addBtn = document.createElement("button");
  const cancel = document.createElement("button");
  const otherProps = document.createElement("div");
  const controlBtns = document.createElement("div");

  taskEditor.id = "task-editor";
  taskName.id = "task-name";
  taskDescription.id = "task-description";
  taskName.value = "Task name";
  taskDescription.value = "Description";
  dueDate.id = "due-date";
  priority.id = "priority";
  dueDate.textContent = "Due date";
  priority.textContent = "Priority";
  addBtn.id = "task-editor-add";
  cancel.id = "task-editor-cancel";
  addBtn.textContent = "Add";
  cancel.textContent = "Cancel";
  otherProps.id = "task-editor-other";
  controlBtns.id = "task-editor-control";

  taskEditor.appendChild(taskName);
  taskEditor.appendChild(taskDescription);
  taskEditor.appendChild(otherProps);
  taskEditor.appendChild(controlBtns);
  otherProps.appendChild(dueDate);
  otherProps.appendChild(priority);
  controlBtns.appendChild(cancel);
  controlBtns.appendChild(addBtn);
  return { taskEditor, addBtn, taskName };
}

function projectToDOM(project) {
  const menuLi = document.createElement("li");
  const p = document.createElement("p");
  const projectIcon = new Image();
  const editIcon = new Image();
  const deleteIcon = new Image();
  const projectView = document.createElement("div");
  const projectHeader = document.createElement("div");
  const projectMain = document.createElement("div");
  const h1 = document.createElement("h1");
  const taskList = document.createElement("ul");

  p.textContent = project.name;
  editIcon.src = editImg;
  deleteIcon.src = deleteImg;
  projectIcon.src = projectImg;
  menuLi.id = "menu-" + project.name;
  projectIcon.classList.add("project-icon");
  editIcon.classList.add("edit-icon");
  deleteIcon.classList.add("delete-icon");
  projectView.classList.add("project-view");
  projectHeader.classList.add("view-project-header");
  projectMain.classList.add("project-main");
  taskList.id = "view-task-list";
  menuLi.append(projectIcon, p, editIcon, deleteIcon);

  h1.textContent = project.name;
  projectView.append(projectHeader, projectMain);
  project.tasks.forEach((task) => {
    const taskName = document.createElement("li");
    taskName.textContent = task.title;
    viewProjects.appendChild(viewTasks);

    taskList.appendChild(taskName);
  });
  projectMain.appendChild(taskList);
  projectHeader.appendChild(h1);

  return { menuLi, projectView, deleteIcon, projectMain };
}

function updatePage() {
  let projectElements = [];
  let projects = getProjects();
  const menuProjectList = document.querySelector("#menu-project-list");
  const view = document.querySelector("#view");
  const newTaskBtn = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = "New task";

  newTaskBtn.append(p);

  menuProjectList.innerHTML = "";
  projects.forEach((proj) => {
    projectElements.push(projectToDOM(proj));
  });

  newTaskBtn.addEventListener("click", () => {
    newTaskBtn.remove();
    let taskEditorElements = viewTaskEditor();
    view.append(taskEditorElements.taskEditor);

    taskEditorElements.addBtn.addEventListener("click", () => {
      taskEditorElements.taskEditor.remove();
      const newTask = taskToDOM(
        taskGenerate(taskEditorElements.taskName.value, "xd", "xd")
      );
      const taskList = document.querySelector("#view-task-list");
      taskList.append(newTask);
      view.append(newTaskBtn);
    });
  });
  projectElements.forEach((projObj) => {
    menuProjectList.appendChild(projObj.menuLi);

    projObj.menuLi.addEventListener("click", (event) => {
      event.stopPropagation();
      view.innerHTML = "";
      view.appendChild(projObj.projectView);
      projObj.projectMain.appendChild(newTaskBtn);
    });
    projObj.deleteIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteProjects(projects[projectElements.indexOf(projObj)]);
      projObj.menuLi.remove();
      projObj.projectView.remove();
    });
  });
}

function taskToDOM(task) {
  const taskLi = document.createElement("li");
  const taskName = document.createElement("h4");

  taskName.textContent = task.title;
  taskLi.append(taskName);

  return taskLi;
}
