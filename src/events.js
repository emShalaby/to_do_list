import { projectGenerate } from "./project.js";
import { addProject } from "./interface.js";
import storedProjects from "./storage.js";
import { storeProjects } from "./storage.js";

export function addEvents() {
  const newProjectDiv = document.querySelector("#new-project");

  newProjectDiv.addEventListener("click", () => {
    addProject(projectGenerate("test", []));
    storedProjects.push(projectGenerate("test", []));
    
    storeProjects(storedProjects);
  });
}
