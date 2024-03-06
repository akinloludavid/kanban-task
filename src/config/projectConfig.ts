import dotenv from 'dotenv-safe'
import type { ProjectConfiguration } from '../types/config'

dotenv.config({
    allowEmptyValues: true,
})

const DB_HOST = process.env.DB_HOST || ''
const DB_USERNAME = process.env.DB_USERNAME || ''
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_DATABASE = process.env.DB_DATABASE || ''
const JWT_SECRET_KEY = process.env.JWT_SECRET as string // Change this to your actual secret key

const SERVER_PORT = process.env.SERVER_PORT || 9999

const SERVICE_NAME = process.env.SERVICE_NAME || 'Microservice'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

// this will contain global configs for the project
export const CONFIG: ProjectConfiguration = {
    DATABASE: {
        HOST: DB_HOST,
        USERNAME: DB_USERNAME,
        PASSWORD: DB_PASSWORD,
        NAME: DB_DATABASE,
    },
    SERVER: {
        PORT: SERVER_PORT,
    },
    SERVICE_NAME,
    LOG_LEVEL,
    JWT_SECRET_KEY,
}

var whitelist = ['https://kanban-task-ak.netlify.app', 'http://localhost:5173']
export const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}
