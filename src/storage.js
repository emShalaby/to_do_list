export function storeProjects(project) {
  const projects = Array.from(
    JSON.parse(localStorage.getItem("projects")) || []
  );
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}
export function deleteProjects(projectName) {
  const projects = Array.from(
    JSON.parse(localStorage.getItem("projects")) || []
  );
  projects.forEach((proj)=> {if(proj.name=projectName){
    projects.splice(projects.indexOf(proj), 1);
  }}
  )
  localStorage.setItem("projects", JSON.stringify(projects));
}


