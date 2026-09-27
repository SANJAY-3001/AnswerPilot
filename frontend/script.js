import { autoResizeTextarea } from "./utils.js";


const textArea = document.getElementById("user-input")
const getAnswerBtn = document.getElementById("get-answer")


function start() {
    textArea.addEventListener("input", () => autoResizeTextarea(textArea))
    getAnswerBtn.addEventListener("click" , getAnswer)
}

async function getAnswer(e) {
    e.preventDefault()

    const userInput = textArea.value.trim()

    if(userInput === '') return;

    const userPrompt = userInput

    const res = await fetch("http://localhost:3001/api/answer" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({userPrompt})
    })

    const data = res.json()

    console.log(data)
}


start() 