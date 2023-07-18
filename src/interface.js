import addImg from "./172525_plus_icon.svg";
import projectImg from "./icons8-project-30.png";
import deleteImg from "./trash-icon.png";
import { createNewTaskBtn, createTaskEditor } from "./newTask.js";
import {
  getProjects,
  getThisWeekTasks,
  getTodayTasks,
  storeInbox,
  storeProjects,
  deleteProjects,
  storeTaskIntoProject,
  getInbox,
  deleteStoredtask,
  getTasks,
} from "./storage";

import { projectGenerate } from "./project";

import { taskGenerate } from "./task.js";

export function pageLoad() {
  headerLoad();
  mainLoad();
  footerLoad();
  menuLoad();
  viewLoad();
  updatePage(false);
  newProjectModal();
}

// website header

function headerLoad() {
  const header = document.createElement("div");
  const content = document.querySelector("#content");

  content.appendChild(header);
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

// side menu inside main

function menuLoad() {
  const menu = document.createElement("div");
  const menuProjects = document.createElement("div");
  const menuTasks = document.createElement("ul");
  const ul = document.createElement("ul");
  const projectsHeader = document.createElement("div");
  const newProjectDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const img = new Image();
  const main = document.querySelector("#main");

  menu.id = "menu";
  menuProjects.id = "menu-projects";
  menuTasks.id = "menu-tasks";
  h3.id = "projects-title";
  h3.textContent = "Projects";
  ul.id = "menu-project-list";
  projectsHeader.id = "menu-projects-header";
  img.src = addImg;
  newProjectDiv.id = "new-project";

  main.append(menu);

  menuProjects.appendChild(ul);
  menu.append(menuTasks, menuProjects);
  menuProjects.prepend(projectsHeader);
  projectsHeader.appendChild(h3);
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
    projectNames = projects.map((project) => project.name);
    if (projectNames.includes(input.value)) return;
    storeProjects(projectGenerate(input.value, []));
    modal.style.display = "none";
    updatePage(true);
  });
}

function projectToDOM(project) {
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

function taskToDOM(task) {
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

function updatePage(isNewProjectCreated) {
  let projectElements = [];

  let projects = getProjects();

  const menuProjectList = document.querySelector("#menu-project-list");

  const view = document.querySelector("#view");
  view.innerHTML = "";
  menuProjectList.innerHTML = "";

  projects.forEach((proj) => {
    projectElements.push(projectToDOM(proj));
  });

  projectElements.forEach((projObj) => {
    //this part makes it so when you add a new project , it shows the project details(.projectView) on the right side
    //isNewProjectCreated is true when a new project is created
    const newTaskBtn = createNewTaskBtn();
    if (isNewProjectCreated) {
      view.innerHTML = "";
      view.append(
        projectToDOM(getProjects().slice(-1)[0]).projectView,
        newTaskBtn
      );
    }
    newTaskBtn.addEventListener("click", () => {
      let taskEditorElements = createTaskEditor();
      view.removeChild(newTaskBtn);
      taskEditorElements.cancel.addEventListener("click", () => {
        taskEditorElements.taskEditor.remove();
        view.append(newTaskBtn);
        return;
      });

      taskEditorElements.addBtn.addEventListener("click", () => {
        taskEditorElements.taskEditor.remove();
        const newTask = taskGenerate(
          taskEditorElements.taskName.value,
          taskEditorElements.taskDescription.value,
          taskEditorElements.dueDate.value
        );

        const newTaskElems = taskToDOM(newTask);

        const taskList = document.querySelector("#view-task-list");

        const taskDeleteIcon = newTaskElems.deleteIcon;

        const checkIcon = newTaskElems.checkIcon;

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
        checkIcon.addEventListener("click", () => {
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

  const inbox = getInbox();
  const inboxElems = projectToDOM(inbox);
  const newTaskBtn = createNewTaskBtn();
  const menuTasks = document.querySelector("#menu-tasks");
  const thisWeek = projectGenerate("This week", getThisWeekTasks());
  const today = projectGenerate("Today", getTodayTasks());
  const thisWeekElems = projectToDOM(thisWeek);
  const todayElems = projectToDOM(today);
  const menuTasksElems = [inboxElems, todayElems, thisWeekElems];

  menuTasks.innerHTML = "";
  inboxElems.projectView.append(newTaskBtn);
  menuTasks.append(inboxElems.menuLi, todayElems.menuLi, thisWeekElems.menuLi);
  menuTasksElems.forEach((obj) => {
    obj.deleteIcon.remove();
    obj.projectIcon.remove();
    obj.menuLi.addEventListener("click", () => {
      view.innerHTML = "";
      view.append(obj.projectView);
      const taskList = document.querySelector("#view-task-list");
      taskList.innerHTML = "";
      const tasks = getTasks(obj.name);
      const taskToDOMS = [];
      tasks.forEach((task) => {
        taskToDOMS.push(taskToDOM(task));
      });
      taskToDOMS.forEach((task) => {
        taskList.append(task.taskLi);
        if (obj.name == "inbox") {
          task.deleteIcon.addEventListener("click", () => {
            task.taskLi.remove();
            inbox.deleteTask(tasks[taskToDOMS.indexOf(task)]);
            console.log(inbox);
            storeInbox(inbox);
          });
          task.checkIcon.addEventListener("click", () => {
            task.taskLi.remove();
            inbox.deleteTask(tasks[taskToDOMS.indexOf(task)]);
            storeInbox(inbox);
          });
          return;
        }
        task.deleteIcon.remove();
        task.checkIcon.remove();
      });
    });
  });

  newTaskBtn.addEventListener("click", () => {
    let taskEditorElements = createTaskEditor();
    let pageProjectView = document.querySelector(".project-view");
    document.querySelector(".new-task-btn").remove();

    taskEditorElements.cancel.addEventListener("click", () => {
      pageProjectView.append(newTaskBtn);
      taskEditorElements.taskEditor.remove();
      return;
    });
    taskEditorElements.addBtn.addEventListener("click", () => {
      taskEditorElements.taskEditor.remove();
      const newTask = taskGenerate(
        taskEditorElements.taskName.value,
        taskEditorElements.taskDescription.value,
        taskEditorElements.dueDate.value
      );

      const newTaskElems = taskToDOM(newTask);

      const taskList = document.querySelector("#view-task-list");

      const taskDeleteIcon = newTaskElems.deleteIcon;

      const checkIcon = newTaskElems.checkIcon;

      taskList.append(newTaskElems.taskLi);

      view.append(newTaskBtn);

      inbox.addTask(newTask);
      storeInbox(inbox);
      taskDeleteIcon.addEventListener("click", () => {
        newTaskElems.taskLi.remove();
        inbox.deleteTask(newTask);
        storeInbox(inbox);
      });
      checkIcon.addEventListener("click", () => {
        newTaskElems.taskLi.remove();
        inbox.deleteTask(newTask);
        storeInbox(inbox);
      });
    });

    view.append(taskEditorElements.taskEditor);
  });
  if (!isNewProjectCreated) view.append(inboxElems.projectView);
}
