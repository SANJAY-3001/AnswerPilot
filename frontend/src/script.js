import { autoResizeTextarea } from "./utils.js";
import { marked } from "marked";
import DOMPurify from "dompurify"


const textArea = document.getElementById("user-input")
const getAnswerBtn = document.getElementById("get-answer")
const outputContent = document.getElementById("output-content")


function start() {
    textArea.addEventListener("input", () => autoResizeTextarea(textArea))
    getAnswerBtn.addEventListener("click" , getAnswer)
}

async function getAnswer(e) {
    e.preventDefault()

    const userInput = textArea.value.trim()

    if(userInput === '') return;

    const userPrompt = userInput

    try {

        const res = await fetch("http://localhost:3001/api/answer" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({userPrompt})
        })

        if(!res.ok) {
            throw new Error("Internal server error")
        }

        const data = await res.json()

        const markDownData = data.answer

        const html = marked.parse(markDownData)

        const safeHtml = DOMPurify.sanitize(html)

        outputContent.innerHTML = safeHtml
        
    }
    catch(err) {
        console.error(err)
    }

}


start() 