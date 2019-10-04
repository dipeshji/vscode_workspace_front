const nodemailer = require("nodemailer");
const pass = require('./pass')

auth={
    user: "dpatidar336@gmail.com", // sender email
    pass: pass.password // sender password
  }

// async..await is not allowed in global scope, must use a wrapper
module.exports.send_mail = async function (credentials,mail_body){

  
// const send_credentials = credentials.name +","+ credentials.mail
// console.log(mail_body);


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: auth
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Dipesh Patidar <dpatidar336@gmail.com>", // sender address
    to:credentials, // list of receivers
    subject: "Service Request", // Subject line
    text: `${mail_body}`// plain text body
    // html:  // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);