import express from "express"
import cors from "cors"
import { OpenAI } from "openai"

const app = express()

const PORT = process.env.PORT || 5000
app.use(cors())


// setting open ai client
const openai = new OpenAI({
    baseURL : process.env.AI_URL,
    apiKey : process.env.AI_KEY
})

const messages = [
    {
        role : "user",
        content : "What is inheritanc in java ?"
    }
]

app.use(`/api/answer` , async (req , res) => {
    // const {userPrompt} = req.body

    const response = await openai.chat.completions.create({
        model : process.env.AI_MODEL,
        messages
    })

    res.json({
        answer : response.choices[0].message.content
    })

})


app.listen(PORT , () => {
    console.log(`Server is running ON port ${PORT}`)
})

