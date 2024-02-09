import express from 'express'
import { CONFIG } from './config/projectConfig'
import healthRoute from './routes/health'
import authRoute from './routes/auth'
import { connectDB } from './database/db'

const app = express()
const PORT = CONFIG.SERVER.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/v1', healthRoute)
app.use('/v1', authRoute)
connectDB()
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT)
})
