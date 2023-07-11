

export function storeProjects(project) {
  const projects = JSON.parse(localStorage.getItem("projects") || []);
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(JSON.parse(localStorage.getItem("projects") || "[]"));
}
