import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'



const app = express()

dotenv.config()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http:localhost:5173',
    }))
}


app.use(express.json())


app.use('/api/notes', notesRoutes)

app.use(express.static(path.join(__dirname, '../frontend/dist')))
if (process.env.NODE_ENV === 'production') {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
})

