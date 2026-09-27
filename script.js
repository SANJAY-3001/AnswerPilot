const textArea = document.getElementById("user-input")

textArea.addEventListener("input", function () {
    textArea.style.height = "auto"
    textArea.style.height = textArea.scrollHeight + "px"
})