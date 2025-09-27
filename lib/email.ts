import nodemailer, { createTransport } from 'nodemailer'

export const mailer = createTransport({
  host: 'smtp.resend.com',
  port: 587,
  auth: {
    user: 'resend',
    pass: 'process.env.RESEND_API_KEY',
  }
})