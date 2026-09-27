import { autoResizeTextarea, setLoading, showStream } from "./utils.js";
import { marked } from "marked";
import DOMPurify from "dompurify"


const textArea = document.getElementById("user-input")
const getAnswerBtn = document.getElementById("get-answer")
const outputContent = document.getElementById("output-content")
const copyBtn = document.getElementById("copy-btn")


function start() {
    textArea.addEventListener("input", () => autoResizeTextarea(textArea))
    copyBtn.addEventListener("click" , copyText)
    getAnswerBtn.addEventListener("click" , getAnswer)
}

async function getAnswer(e) {
    e.preventDefault()

    const userInput = textArea.value.trim()
    textArea.value = ""

    if(userInput === '') return;

    const userPrompt = userInput

    setLoading(true)

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

        showStream()

        const reader = res.body.getReader()

        const decoder = new TextDecoder()

        let markDownData = ''

        while(true) {

            const {value , done} = await reader.read()

            if(done) break;

            const chunk = decoder.decode(value , {
                stream : true
            })

            markDownData += chunk

            const html = marked.parse(markDownData)
    
            const safeHtml = DOMPurify.sanitize(html)
    
            outputContent.innerHTML = safeHtml
        }


        
    }
    catch(err) {
        console.error(err)
    }
    finally {
        setLoading(false)
    }

}



function copyText() {
    const outputContent = document.getElementById("output-content").textContent

    navigator.clipboard.writeText(outputContent)
        .then(() => {
            copyBtn.innerHTML = `
                    <img src="images/copy-icon.png">
                    <span>Copied!</span>
                `

            setTimeout(()=>{
                copyBtn.innerHTML = `
                    <img src="images/copy-icon.png">
                    <span>Copy</span>
                `
            },2000)
        })
}

start() 