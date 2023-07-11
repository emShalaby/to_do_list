export  function pageLoad() {
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const content = document.querySelector("#content");

  header.id = "header";
  main.id = "main";
  footer.id = "footer";

  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
}
