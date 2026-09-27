function autoResizeTextarea(textArea) {
    console.log("auto called")
    textArea.style.height = "auto"
    textArea.style.height = textArea.scrollHeight + "px"
}

export {autoResizeTextarea}