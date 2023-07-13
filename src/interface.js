import img0 from "./172525_plus_icon.svg";
import img1 from "./three-dots-punctuation-sign-svgrepo-com.svg";
import img2 from "./icons8-project-30.png";
import img3 from "./trash-icon.png";
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
  newProjectModal();
  menuLoad();
  viewLoad();
  footerLoad();
  loadStoredProjects();
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

//side menu inside main

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
  projectsHeader.id = "projects-header";
  img.src = img0;
  newProjectDiv.id = "new-project";

  menuProjects.appendChild(ul);
  main.prepend(menu);
  menu.appendChild(menuProjects);
  menuProjects.prepend(projectsHeader);
  projectsHeader.appendChild(h5);
  projectsHeader.appendChild(newProjectDiv);
  newProjectDiv.appendChild(img);

  projectsHeader.addEventListener("click", showViewProjects);
  newProjectDiv.addEventListener("click", () => {
    const modal = document.querySelector("#new-project-modal");
    modal.style.display = "flex";
  });
}

//right view area inside main

function viewLoad() {
  const view = document.createElement("div");
  const viewProjects = document.createElement("div");
  const viewTasks = document.createElement("div");
  const main = document.querySelector("#main");

  view.id = "view";
  viewProjects.id = "view-projects";
  viewTasks.id = "view-tasks";
  main.appendChild(view);
  viewProjects.appendChild(viewTasks);
}

//function too add a project to DOM

function addProject(project) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const projectIcon = new Image();
  const editIcon = new Image();
  const deleteIcon = new Image();
  const ul = document.querySelector("#menu-project-list");

  projectIcon.src = img2;
  projectIcon.classList.add("project-icon");
  editIcon.classList.add("edit-icon");
  editIcon.src = img1;
  deleteIcon.classList.add("delete-icon");
  deleteIcon.src = img3;
  li.id = project.name;

  li.classList.add("project");
  p.textContent = project.name;
  li.appendChild(projectIcon);
  li.appendChild(p);
  li.appendChild(editIcon);

  li.appendChild(deleteIcon);
  ul.appendChild(li);

  deleteIcon.addEventListener("click", () => {
    deleteProjects(deleteIcon.parentNode.id);
    deleteIcon.parentNode.remove();
  });

  li.addEventListener("click", () => {
    showActiveProject(li.id);
    activeProjectName = li.id;
  });
}

//modal for adding a new project

function newProjectModal() {
  const modal = document.createElement("div");
  const content = document.querySelector("#content");
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
    modal.style.display = "none";
    addProject(projectGenerate(input.value, []));
    storeProjects(projectGenerate(input.value, []));
    showActiveProject(input.value);
    activeProjectName = input.value;
  });
}

// function to show projects in the view area

export function showViewProjects() {
  if (document.querySelector("#view-header"))
    document.querySelector("#view-header").remove();
  if (document.querySelector("#view-main"))
    document.querySelector("#view-main").remove();
  const projects = getProjects();

  const viewHeader = document.createElement("div");
  const h2 = document.createElement("h2");
  const view = document.querySelector("#view");
  const projectList = document.createElement("ul");
  const main = document.createElement("div");

  viewHeader.id = "view-header";
  h2.textContent = "Projects";
  projectList.id = "view-project-list";
  main.id = "view-main";

  view.appendChild(viewHeader);
  viewHeader.appendChild(h2);
  main.appendChild(projectList);
  view.appendChild(main);

  if (projects.length == 0) return;
  projects.forEach((proj) => {
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.textContent = proj.name;

    projectList.appendChild(li);
    li.appendChild(p);
  });
}

//function to show the current project thats being clicked on

function showActiveProject(projectName) {
  if (document.querySelector("#view-header"))
    document.querySelector("#view-header").remove();
  if (document.querySelector("#view-main"))
    document.querySelector("#view-main").remove();

  let project = getProjectByName(projectName);

  const h2 = document.createElement("h2");
  const viewHeader = document.createElement("div");
  const viewMain = document.createElement("div");
  const view = document.querySelector("#view");
  const taskList = document.createElement("ul");
  const addTaskIcon = new Image();
  const addNewTask = document.createElement("div");
  const p = document.createElement("p");
  const tasks = getProjectByName(projectName).tasks;
  console.log(tasks)

  viewHeader.id = "view-header";
  viewMain.id = "view-main";
  h2.textContent = project.name;
  taskList.id = "view-task-list";
  addTaskIcon.id = "add-task-icon";
  addTaskIcon.src = img0;
  p.textContent = "New task";
  addNewTask.id = "view-add-task";

  view.appendChild(viewHeader);
  view.appendChild(viewMain);
  viewHeader.appendChild(h2);
  viewMain.appendChild(taskList);
  addNewTask.appendChild(addTaskIcon);
  addNewTask.appendChild(p);

  addNewTask.addEventListener("click", () => {});
  addTaskIcon.addEventListener("click", () => {
    viewTaskEditor();
    addNewTask.remove();
  });
  tasks.forEach((task) => {
    const taskElem = document.createElement("li");
    taskElem.textContent = task.title;
    taskList.appendChild(taskElem);
  });
  taskList.appendChild(addNewTask);
}

//function to load stored projects into their elements

function loadStoredProjects() {
  let projects = getProjects();
  projects.forEach((proj) => {
    addProject(proj);
  });
}

function viewTaskEditor() {
  const taskEditor = document.createElement("div");
  const taskName = document.createElement("input");
  const taskDescription = document.createElement("input");
  const viewMain = document.querySelector("#view-main");
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
  viewMain.appendChild(taskEditor);

  addBtn.addEventListener(
    "click",
    () => {
      let project = getProjectByName(activeProjectName);
      deleteProjects(project);
      project.addTask(
        taskGenerate(taskName.value, taskDescription.value, "today", "1")
      );
      storeProjects(project);
      taskEditor.remove();
      showActiveProject(project.name);
      const task = document.createElement("li");
      const taskList = document.querySelector("#view-task-list");

      taskList.appendChild(task);
      task.id = taskName;
      taskList.textContent = taskName.value;
      showActiveProject(activeProjectName);
    },
    { once: true }
  );
}
