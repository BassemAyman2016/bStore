const nodemailer = require("nodemailer");
const config = require('../config/setup')
// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
async function send(from, to, subject, text, html) {
    return new Promise((resolve,reject)=>{
        var mailerOptions={
            service: "hotmail",
            auth: {
                user: config.email_user, // generated ethereal user
                pass: config.email_pass // generated ethereal password
            }
        }
        let transporter = nodemailer.createTransport(mailerOptions);

        // send mail with defined transport object
        let info =  transporter.sendMail({
            from: `bStore <${config.email_bot}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text,// plain body
            html: html
        },
        (error,info)=>{ 
            if (error) {
                console.log("error is "+error);
                reject(false); // or use rejcet(false) but then you will have to handle errors
            } 
           else {
               console.log('Email sent: ' + info.response);
               resolve(true);
            }
        });

        console.log("Message sent");
        
    })

}
module.exports = {
    send: send
}
