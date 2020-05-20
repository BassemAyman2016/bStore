require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    secretOrKey: process.env.SECRET,
    email_user: process.env.email_user,
    email_pass: process.env.email_pass,
    frontend_url: process.env.FRONTEND_URL,
    stripe_key:process.env.STRIPE_KEY
}