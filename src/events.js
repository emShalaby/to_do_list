import { projectGenerate } from "./project.js";
import { addProject } from "./interface.js";

export function addEvents() {
  const newProjectDiv = document.querySelector("#new-project");

  newProjectDiv.addEventListener("click", () => {
    addProject(projectGenerate("test", []));
  });
}
