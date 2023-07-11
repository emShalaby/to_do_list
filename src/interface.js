export function pageLoad() {
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const content = document.querySelector("#content");
  const h1 = document.createElement("h1");
  const menu = document.createElement("div");
  const view = document.createElement("div");
  //menuProjects and menuTasks for how they appear on the menu div
  const menuProjects = document.createElement("div");
  const menuTasks = document.createElement("div");
  // viewProjects and viewtasks for how they appear on the view div
  const viewProjects = document.createElement("div");
  const viewTasks = document.createElement("div");

  header.id = "header";
  main.id = "main";
  footer.id = "footer";
  h1.textContent = "TO DO LIST";
  h1.id = "website-title";
  menu.id = "menu";
  view.id = "view";
  menuProjects.id = "menu-projects";
  menuTasks.id = "menu-tasks";
  viewProjects.id = "view-projects";
  viewTasks.id = "view-tasks";

  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
  header.appendChild(h1);
  main.appendChild(menu);
  main.appendChild(view);
  menu.appendChild(menuProjects);
  menuProjects.appendChild(menuTasks);
}
export function addProject(project) {}
