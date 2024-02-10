import express from 'express'
import morgan from 'morgan'
import { CONFIG } from './config/projectConfig'
import healthRoute from './routes/health'
import authRoute from './routes/auth'
import boardsRoute from './routes/board'
import { connectDB } from './database/db'
const app = express()
const PORT = CONFIG.SERVER.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use('/v1', healthRoute)
app.use('/v1', authRoute)
app.use('/v1', boardsRoute)

connectDB()
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT)
})
