import { projectGenerate } from "./project";

export function storeProjects(project) {
  let projects = getProjects();
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}
export function deleteProjects(project) {
  let projects = Array.from(JSON.parse(localStorage.getItem("projects")) || []);
  projects.forEach((proj) => {
    if (JSON.stringify(project) === JSON.stringify(proj)) {
      let index = projects.indexOf(proj);
      projects = projects.slice(0, index).concat(projects.slice(index + 1));
    }
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.forEach((project) => {
    let index = projects.indexOf(project);
    projects = projects.slice(0, index).concat(projects.slice(index + 1));
    projects.push(projectGenerate(project.name, project.tasks));
  });
  return projects;
}

export function getProjectByName(name) {
  let projects = getProjects();
  let returnProject = {};
  projects.forEach((project) => {
    if (project.name == name) {
      returnProject = project;
    }
  });
  return returnProject;
}

export function storeTaskIntoProject(project, task) {
  let projects = getProjects();
  projects.forEach((proj) => deleteProjects(proj));
  project.addTask(task);
  console.log(project);
  projects.forEach((proj) => {
    if (proj.name == project.name) proj.tasks = project.tasks;
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

window.getProjects = getProjects;
