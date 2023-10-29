import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

export const jwtKey = process.env.JWT_KEY
export const cookieName = process.env.COOKIE_NAME