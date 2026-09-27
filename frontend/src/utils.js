function autoResizeTextarea(textArea) {
    console.log("auto called")
    textArea.style.height = "auto"
    textArea.style.height = textArea.scrollHeight + "px"
}

function setLoading(isLoading) {
    const textArea = document.getElementById("user-input")
    const getAnswerBtn = document.getElementById("get-answer")
    const outputContainer = document.getElementById("output-container")
    const loader = document.getElementById("loader")
    const btnLoader = document.getElementById("btn-loader")
    const btnText = document.getElementById("btn-text")
    const placeholderText = document.getElementById("placeholder-text")

    getAnswerBtn.disabled = isLoading
    
    if (isLoading) {
        textArea.style.height = "auto"
        placeholderText.classList.remove("hidden")
        
        loader.classList.remove("hidden")
        loader.classList.add("visible")
        
        btnLoader.classList.remove("hidden")
        btnLoader.classList.add("visible")
        btnText.textContent = `Creating your answer…`
        
    }
    else {
        outputContainer.classList.remove("hidden")
        outputContainer.classList.add("visible")

        placeholderText.classList.add("hidden")
    
        loader.classList.add("hidden")
        loader.classList.remove("visible")
        
        btnLoader.classList.add("hidden")
        btnLoader.classList.remove("visible")
        btnText.textContent = `Generate my answer`

    }
}

function showStream() {
    const outputContainer = document.getElementById("output-container")
    outputContainer.classList.remove("hidden")
    outputContainer.classList.add("visible")
}

export {autoResizeTextarea , setLoading , showStream}