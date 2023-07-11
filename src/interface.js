export function pageLoad() {
  headerLoad();
  mainLoad();
  footerLoad();
}

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

function mainLoad() {
  const main = document.createElement("div");
  const menu = document.createElement("div");
  const view = document.createElement("div");
  const menuProjects = document.createElement("div");
  const menuTasks = document.createElement("div");
  const viewProjects = document.createElement("div");
  const viewTasks = document.createElement("div");
  const content = document.querySelector("#content");
  const h2 = document.createElement("h2");
  const ul = document.createElement("ul");

  main.id = "main";
  menu.id = "menu";
  view.id = "view";
  menuProjects.id = "menu-projects";
  menuTasks.id = "menu-tasks";
  viewProjects.id = "view-projects";
  viewTasks.id = "view-tasks";
  h2.id = "projects-title";
  h2.textContent = "Projects";
  ul.id = "project-list";

  content.appendChild(main);
  main.appendChild(menu);
  main.appendChild(view);
  menu.appendChild(menuProjects);
  menuProjects.appendChild(h2);
  menuProjects.appendChild(ul);

  view.appendChild(viewProjects);
  viewProjects.appendChild(viewTasks);
}

function footerLoad() {
  const footer = document.createElement("div");
  const content = document.querySelector("#content");
  footer.id = "footer";
  content.appendChild(footer);
}

function addProject(project) {
  const projectList = document.querySelector("#projects-list");
  const projectName = project.name;
  const li = document.createElement("li");

  li.textContent = projectName;
}

