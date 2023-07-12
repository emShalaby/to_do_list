import { projectGenerate } from "./project";

export function storeProjects(project) {
  let projects = getProjects();
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}
export function deleteProjects(projectName) {
  let projects = Array.from(JSON.parse(localStorage.getItem("projects")) || []);
  projects.forEach((proj) => {
    if ((proj.name = projectName)) {
      projects.splice(projects.indexOf(proj), 1);
    }
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.forEach((project) => {
    projects.splice(projects.indexOf(project), 1);
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
  })
  return returnProject;
}

window.getProjectByName = getProjectByName;

window.getProjects = getProjects;
