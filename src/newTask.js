import addImg from "./172525_plus_icon.svg";

export function createNewTaskBtn() {
  const newTaskBtn = document.createElement("div");
  const plusIcon = new Image();
  const p = document.createElement("p");
  plusIcon.src = addImg;
  plusIcon.classList.add("plus-icon");
  newTaskBtn.append(plusIcon, p);
  p.textContent = "New task";
  newTaskBtn.classList.add("new-task-btn");
  return newTaskBtn;
}

export function createTaskEditor() {
    const taskEditor = document.createElement("div");
    const taskName = document.createElement("input");
    const taskDescription = document.createElement("input");
    const dueDate = document.createElement("input");
    const addBtn = document.createElement("button");
    const cancel = document.createElement("button");
    const otherProps = document.createElement("div");
    const controlBtns = document.createElement("div");
  
    taskEditor.id = "task-editor";
    taskName.id = "task-name";
    taskDescription.id = "task-description";
    taskName.value = "Task name";
    taskDescription.value = "Description";
    dueDate.id = "due-date";
    dueDate.textContent = "Due date";
    dueDate.type = "date";
    addBtn.id = "task-editor-add";
    cancel.id = "task-editor-cancel";
    addBtn.textContent = "Add";
    cancel.textContent = "Cancel";
    otherProps.id = "task-editor-other";
    controlBtns.id = "task-editor-control";
  
    taskEditor.appendChild(taskName);
    taskEditor.appendChild(taskDescription);
    taskEditor.appendChild(otherProps);
    taskEditor.appendChild(controlBtns);
    otherProps.appendChild(dueDate);
    controlBtns.appendChild(cancel);
    controlBtns.appendChild(addBtn);
    return { taskEditor, addBtn, taskName, taskDescription, dueDate, cancel };
  }