import { autoResizeTextarea } from "./utils.js";


const textArea = document.getElementById("user-input")


function start() {
    textArea.addEventListener("input", () => autoResizeTextarea(textArea))
}


// fetch("http://localhost")


start()