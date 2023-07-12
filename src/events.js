import { projectGenerate } from "./project.js";
import { addProject } from "./interface.js";
import { deleteProjects } from "./storage.js";

export function addEvents() {
  const newProjectDiv = document.querySelector("#new-project");

  newProjectDiv.addEventListener(
    "click",
    () => {
      addProject(projectGenerate("test", []));
    },

    { once: true }
  );
  const deleteIcons = document.querySelectorAll(".delete-icon");
  deleteIcons.forEach((icon) =>
    icon.addEventListener(
      "click",
      () => {
        deleteProjects(icon.parentNode.id);
        icon.parentNode.remove();
      },
      { once: true }
    )
  );
}
