import { showViewProjects } from "./interface/js";
import { deleteProjects } from "./storage";
export function newProjectBtnEvents() {
  let newProjectBtn = document.querySelector("#new-project");
  newProjectBtn.addEventListener("click", () => {
    const modal = document.querySelector("#new-project-modal");
    modal.style.display = "flex";
  });
}

export function menuProjectsHeaderEvents() {
  let menuProjectHeader = document.querySelector("projects-header");
  menuProjectHeader.addEventListener("click", showViewProjects);
}

export function deleteIconEvents() {
  deleteIcon = document.querySelector("#delete-icon");
  deleteIcon.addEventListener("click", () => {
    deleteProjects(deleteIcon.parentNode.id);
    deleteIcon.parentNode.remove();
  });
}
