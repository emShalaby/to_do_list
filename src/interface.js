import addImg from "./172525_plus_icon.svg";
import editImg from "./three-dots-punctuation-sign-svgrepo-com.svg";
import projectImg from "./icons8-project-30.png";
import deleteImg from "./trash-icon.png";
import { getProjects } from "./storage";
import { projectGenerate } from "./project";
import { storeProjects } from "./storage";
import { deleteProjects } from "./storage";
import { taskGenerate } from "./task.js";
import { storeTaskIntoProject } from "./storage";
import { deleteStoredtask } from "./storage";

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
  const inbox = document.createElement("div");
  const today = document.createElement("div");
  const thisWeek = document.createElement("div");

  menu.id = "menu";
  menuProjects.id = "menu-projects";
  menuTasks.id = "menu-tasks";
  h5.id = "projects-title";
  h5.textContent = "Projects";
  ul.id = "menu-project-list";
  projectsHeader.id = "menu-projects-header";
  img.src = addImg;
  newProjectDiv.id = "new-project";
  inbox.id = "inbox";
  today.id = "today";
  thisWeek.id = "this-week";
  inbox.textContent = "Inbox";
  today.textContent = "Today";
  thisWeek.textContent = "This week";

  main.append(menu);

  menuProjects.appendChild(ul);
  menu.append(inbox, today, thisWeek, menuProjects);
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
  if (document.querySelector("#view")) document.querySelector("#view").remove();
  const view = document.createElement("div");
  const header = document.createElement("div");
  const main = document.querySelector("#main");
  const menuProjectsHeader = document.querySelector("#menu-projects-header");
  const h1 = document.createElement("h1");

  view.id = "view";
  header.appendChild(h1);
  main.appendChild(view);

  menuProjectsHeader.addEventListener("click", () => {
    const projects = getProjects();
    const projectList = document.createElement("ul");
    view.innerHTML = "";
    view.append(header, projectList);
    h1.textContent = "Projects";
    header.classList.add("view-project-header");
    projects.forEach((proj) => {
      const projectElems = projectToDOM(proj);
      const li = document.createElement("li");
      li.textContent = proj.name;
      projectList.append(li);
    });
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
    let projects = getProjects();
    let projectNames = [];
    projects.forEach((project) => {
      projectNames.push(project.name);
    });
    if (projectNames.includes(input.value)) return;
    storeProjects(projectGenerate(input.value, []));
    modal.style.display = "none";
    updatePage();
  });
}

function createTaskEditor() {
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
  return { taskEditor, addBtn, taskName, taskDescription };
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
    const taskElems = taskToDOM(task);
    const taskElement = taskElems.taskLi;
    taskList.append(taskElement);
    const taskDeleteIcon = taskElems.deleteIcon;
    taskDeleteIcon.addEventListener("click", () => {
      taskElement.remove();
      project.deleteTask(task);
      deleteStoredtask(project, task);
    });
  });
  projectMain.appendChild(taskList);
  projectHeader.appendChild(h1);

  return { menuLi, projectView, deleteIcon, projectMain };
}

function taskToDOM(task) {
  const taskLi = document.createElement("li");
  const taskName = document.createElement("h4");
  const taskDescription = document.createElement("h5");
  const dueDate = document.createElement("h5");
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

function createNewTaskBtn() {
  const newTaskBtn = document.createElement("div");
  const plusIcon = new Image();
  const p = document.createElement("p");
  plusIcon.src = addImg;
  plusIcon.classList.add("plus-icon");
  newTaskBtn.append(plusIcon, p);
  p.textContent = "New task";
  newTaskBtn.classList.add("new-task-btn");
  return newTaskBtn;
}

function updatePage() {
  let projectElements = [];

  let projects = getProjects();

  const menuProjectList = document.querySelector("#menu-project-list");

  const view = document.querySelector("#view");

  menuProjectList.innerHTML = "";

  projects.forEach((proj) => {
    projectElements.push(projectToDOM(proj));
  });

  projectElements.forEach((projObj) => {
    const newTaskBtn = createNewTaskBtn();

    newTaskBtn.addEventListener("click", () => {
      newTaskBtn.remove();

      let taskEditorElements = createTaskEditor();

      taskEditorElements.addBtn.addEventListener("click", () => {
        taskEditorElements.taskEditor.remove();
        const newTask = taskGenerate(
          taskEditorElements.taskName.value,
          taskEditorElements.taskDescription.value,
          "xd"
        );

        const newTaskElems = taskToDOM(newTask);

        const taskList = document.querySelector("#view-task-list");

        const taskDeleteIcon = newTaskElems.deleteIcon;

        taskList.append(newTaskElems.taskLi);

        view.append(newTaskBtn);

        storeTaskIntoProject(
          projects[projectElements.indexOf(projObj)],
          newTask
        );

        taskDeleteIcon.addEventListener("click", () => {
          newTaskElems.taskLi.remove();
          projects[projectElements.indexOf(projObj)].deleteTask(newTask);
          deleteStoredtask(projects[projectElements.indexOf(projObj)], newTask);
        });
      });

      view.append(taskEditorElements.taskEditor);
    });

    menuProjectList.appendChild(projObj.menuLi);

    projObj.menuLi.addEventListener("click", (event) => {
      event.stopPropagation();
      view.innerHTML = "";
      view.appendChild(projObj.projectView);
      view.appendChild(newTaskBtn);
    });

    projObj.deleteIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteProjects(projects[projectElements.indexOf(projObj)]);
      projObj.menuLi.remove();
      projObj.projectView.remove();
      view.innerHTML = "";
    });
  });
}
