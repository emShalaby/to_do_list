export function storeProjects(project) {
  const projects = Array.from(
    JSON.parse(localStorage.getItem("projects")) || []
  );
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}
export function deleteProjects(project) {
  const projects = Array.from(
    JSON.parse(localStorage.getItem("projects")) || []
  );
  projects.splice(projects.indexOf(project), 1);
  localStorage.setItem("projects", JSON.stringify(projects));
}
