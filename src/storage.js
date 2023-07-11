const storedProjects = [];
export default storedProjects;

export function storeProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(JSON.parse(localStorage.getItem("projects") || "[]"));
}
