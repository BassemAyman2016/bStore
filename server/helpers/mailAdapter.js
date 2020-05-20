const nodemailer = require("nodemailer");
const config = require('../config/setup')

async function send(from, to, subject, text, html) {
    return new Promise((resolve,reject)=>{
        var mailerOptions={
            service: "hotmail",
            auth: {
                user: config.email_user, 
                pass: config.email_pass 
            }
        }
        let transporter = nodemailer.createTransport(mailerOptions);

        let info =  transporter.sendMail({
            from: `bStore <${config.email_user}>`,
            to: to, 
            subject: subject, 
            text: text,
            html: html
        },
        (error,info)=>{ 
            if (error) {
                console.log("error is "+error);
                reject(false); 
            } 
           else {
               console.log('Email sent: ' + info.response);
               resolve(true);
            }
        });
    })
}
module.exports = {
    send: send
}
