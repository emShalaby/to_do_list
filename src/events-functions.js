import { showViewProjects } from "./interface/js";
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
