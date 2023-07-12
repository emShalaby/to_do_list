import img0 from "./172525_plus_icon.svg";
import img1 from "./three-dots-punctuation-sign-svgrepo-com.svg";
import img2 from "./icons8-project-30.png";
import img3 from "./trash-icon.png";
import { getProjects } from "./storage";
import { projectGenerate } from "./project";
import { storeProjects } from "./storage";
import { deleteProjects } from "./storage";
export function pageLoad() {
  headerLoad();
  newProjectModal();
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

export function mainLoad() {
  if (document.querySelector("#main")) document.querySelector("#main").remove();
  const main = document.createElement("div");
  const menu = document.createElement("div");
  const view = document.createElement("div");
  const menuProjects = document.createElement("div");
  const menuTasks = document.createElement("div");
  const viewProjects = document.createElement("div");
  const viewTasks = document.createElement("div");
  const content = document.querySelector("#content");
  const h5 = document.createElement("h5");
  const img = new Image();
  const ul = document.createElement("ul");
  const projectsHeader = document.createElement("div");
  const newProjectDiv = document.createElement("div");

  main.id = "main";
  menu.id = "menu";
  view.id = "view";
  menuProjects.id = "menu-projects";
  menuTasks.id = "menu-tasks";
  viewProjects.id = "view-projects";
  viewTasks.id = "view-tasks";
  h5.id = "projects-title";
  h5.textContent = "Projects";
  ul.id = "project-list";
  projectsHeader.id = "projects-header";
  img.src = img0;
  newProjectDiv.id = "new-project";

  menuProjects.appendChild(ul);
  content.appendChild(main);
  main.appendChild(menu);
  main.appendChild(view);
  menu.appendChild(menuProjects);
  menuProjects.prepend(projectsHeader);

  projectsHeader.appendChild(h5);
  projectsHeader.appendChild(newProjectDiv);
  newProjectDiv.appendChild(img);
  view.appendChild(viewProjects);
  viewProjects.appendChild(viewTasks);
  let projects = getProjects();
  projects.forEach((proj) => addProject(proj));

  newProjectDiv.addEventListener("click", () => {
    const modal = document.querySelector("#new-project-modal");
    modal.style.display = "flex";
  });
}

function footerLoad() {
  const footer = document.createElement("div");
  const content = document.querySelector("#content");
  footer.id = "footer";
  content.appendChild(footer);
}

export function addProject(project) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const projectIcon = new Image();
  const editIcon = new Image();
  const deleteIcon = new Image();
  const ul = document.querySelector("#project-list");
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
}

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
  });
}
