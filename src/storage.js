import { projectGenerate } from "./project";
import { addWeeks, format } from "date-fns";

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
  projects.forEach((proj) => {
    if (proj.name == project.name) proj.tasks = project.tasks;
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

window.getProjects = getProjects;

export function deleteStoredtask(project, task) {
  let projects = getProjects();
  projects.forEach((proj) => deleteProjects(proj));
  project.deleteTask(task);
  projects.forEach((proj) => {
    if (proj.name == project.name) proj.tasks = project.tasks;
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getTodayTasks() {
  let projects = getProjects();
  let todayTasks = [];
  let inboxTasks = getInbox().tasks;
  inboxTasks.forEach((task) => {
    if (task.duedate == format(new Date(), "yyyy-MM-dd")) todayTasks.push(task);
  });

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.duedate == format(new Date(), "yyyy-MM-dd"))
        todayTasks.push(task);
    });
  });
  return todayTasks;
}
window.getTodayTasks = getTodayTasks;

export function getThisWeekTasks() {
  let projects = getProjects();
  let thisWeekTasks = [];
  let inboxTasks = getInbox().tasks;
  inboxTasks.forEach((task) => {
    if (
      task.duedate >= format(new Date(), "yyyy-MM-dd") &&
      task.duedate <= format(addWeeks(new Date(), 1), "yyyy-MM-dd")
    )
      thisWeekTasks.push(task);
  });
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (
        task.duedate >= format(new Date(), "yyyy-MM-dd") &&
        task.duedate <= format(addWeeks(new Date(), 1), "yyyy-MM-dd")
      )
        thisWeekTasks.push(task);
    });
  });
  return thisWeekTasks;
}
export function storeInbox(inbox) {
  localStorage.setItem("inbox", JSON.stringify(inbox));
}
export function getInbox() {
  let inbox =
    JSON.parse(localStorage.getItem("inbox")) || projectGenerate("inbox", []);
  return projectGenerate("inbox", inbox.tasks);
}
window.getThisWeekTasks = getThisWeekTasks;
window.addWeeks = addWeeks;

export function getTasks(name) {
  if (name == "This week") return getThisWeekTasks();
  else if (name == "Today") return getTodayTasks();
  else return getInbox().tasks;
}
