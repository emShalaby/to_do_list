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

  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
  header.appendChild(h1);
  main.appendChild(menu);
  main.appendChild(view);
  menu.appendChild(menuProjects);
  menuProjects.appendChild(menuTasks);
}
