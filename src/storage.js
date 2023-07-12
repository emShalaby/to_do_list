export function storeProjects(project) {
  
  
  const projects = Array.from(
    JSON.parse(localStorage.getItem("projects")) || []
  );
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}
