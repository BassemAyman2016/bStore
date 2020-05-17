require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    secretOrKey: process.env.SECRET,
    email_bot: process.env.email_bot,
    email_host: process.env.email_host,
    email_user: process.env.email_user,
    email_pass: process.env.email_pass,
    email_port: process.env.email_port,
    frontend_url: process.env.FRONTEND_URL,
    stripe_key:process.env.STRIPE_KEY
}