import img0 from "./172525_plus_icon.svg";
import img1 from "./three-dots-punctuation-sign-svgrepo-com.svg";
import img2 from "./icons8-project-30.png";

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
  const h5 = document.createElement("h5");
  const ul = document.createElement("ul");
  const projectsHeader = document.createElement("div");
  const newProjectDiv = document.createElement("div");
  const img = new Image();

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

  content.appendChild(main);
  main.appendChild(menu);
  main.appendChild(view);
  menu.appendChild(menuProjects);
  menuProjects.appendChild(projectsHeader);
  menuProjects.appendChild(ul);
  projectsHeader.appendChild(h5);
  projectsHeader.appendChild(newProjectDiv);
  newProjectDiv.appendChild(img);
  view.appendChild(viewProjects);
  viewProjects.appendChild(viewTasks);

  function loadStoredProjects() {
    if (localStorage["projects"]) {
      const projects = Array.from(JSON.parse(localStorage.getItem("projects")));
      projects.forEach((element) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const editIcon = new Image();
        const projectIcon = new Image();
        projectIcon.src = img2;
        projectIcon.classList.add("project-icon");
        editIcon.classList.add("edit-icon");
        editIcon.src = img1;

        li.classList.add("project");
        p.textContent = element.name;
        li.appendChild(projectIcon);
        li.appendChild(p);
        li.appendChild(editIcon);
        ul.appendChild(li);
      });
    }
  }

  loadStoredProjects();
}

function footerLoad() {
  const footer = document.createElement("div");
  const content = document.querySelector("#content");
  footer.id = "footer";
  content.appendChild(footer);
}

export function addProject(project) {
  const projectList = document.querySelector("#project-list");
  const projectName = project.name;
  const li = document.createElement("li");

  li.textContent = projectName;

  projectList.appendChild(li);
}
