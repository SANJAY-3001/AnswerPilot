import express, { json } from "express"
import cors from "cors"
import { OpenAI } from "openai"

const app = express()

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())


// setting open ai client
const openai = new OpenAI({
    baseURL : process.env.AI_URL,
    apiKey : process.env.AI_KEY
})

const messages = [
    {
        role : "system",
        content : "Your are assistant.Going to answer for the interview questions"
    }
]

app.post(`/api/answer` , async (req , res) => {
    const {userPrompt} = req.body

    messages.push({
        role : "user" ,
        content : userPrompt
    })

    const response = await openai.chat.completions.create({
        model : process.env.AI_MODEL,
        messages
    })

    res.status(200).json({
        answer : response.choices[0].message.content
    })

})


app.listen(PORT , () => {
    console.log(`Server is running ON port ${PORT}`)
})

