export function newProjectBtnEvents() {
  let newProjectBtn = document.querySelector("#new-project");
  newProjectBtn.addEventListener("click", () => {
    const modal = document.querySelector("#new-project-modal");
    modal.style.display = "flex";
  });
}
