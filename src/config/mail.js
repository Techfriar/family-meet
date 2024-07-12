import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables from the .env file into process.env
dotenv.config()

// Create a transporter with gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
})

export default transporter
 