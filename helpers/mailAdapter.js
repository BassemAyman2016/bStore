const nodemailer = require("nodemailer");
const config = require('../config/setup')
// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
async function send(from, to, subject, text, html) {
    console.log(config.email_user)
    console.log(config.email_pass)
    var mailerOptions={
        service: "hotmail",
        auth: {
            user: config.email_user, // generated ethereal user
            pass: config.email_pass // generated ethereal password
        }
    }
    console.log(mailerOptions)
    let transporter = nodemailer.createTransport(mailerOptions);

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `bStore <${config.email_bot}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text,// plain body
        html: html
    },
    (error,info)=>{ 
        console.log("error",error) 
        console.log("info",info)}
    );

    console.log("Message sent");
    console.log(info);
    return info

}
module.exports = {
    send: send
}
