import { pageLoad } from "./interface.js";
import "./style.css";
import { projectGenerate } from "./project";

pageLoad();
window.projectGenerate = projectGenerate;
