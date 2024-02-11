import express from 'express'
import morgan from 'morgan'
import { CONFIG } from './config/projectConfig'
import healthRoute from './routes/health'
import authRoute from './routes/auth'
import boardsRoutes from './routes/board'
import tasksRoutes from './routes/task'

import { connectDB } from './database/db'
const app = express()
const PORT = CONFIG.SERVER.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use('/v1', healthRoute)
app.use('/v1', authRoute)
app.use('/v1', boardsRoutes)
app.use('/v1', tasksRoutes)


connectDB()
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production')
        console.log('listening on port: ' + PORT)
})
