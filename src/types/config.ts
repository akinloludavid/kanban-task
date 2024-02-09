export type ProjectConfiguration = {
    DATABASE: {
        HOST: string
        USERNAME: string
        PASSWORD: string
        NAME: string
    }

    SERVER: {
        PORT: string | number
    }
    SERVICE_NAME: string
    LOG_LEVEL: string
    JWT_SECRET_KEY: string
}
