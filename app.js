import express from 'express'
import cors from 'cors'

// CONSTANTS
export const PORT = process.env.PORT || 5000

// EXPRESS APP
const app = express()

//MIDDLEWARE
app.use(cors())

// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({ message: "I'm running baby!" })
})

// SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
