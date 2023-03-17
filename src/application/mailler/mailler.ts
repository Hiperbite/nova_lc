import nodemailer, { SendMailOptions } from "nodemailer";
import log from "../logger";
import { smtp, NODE_ENV, MAILER_USER } from "../../config";
//const MAILER_USER='mailtrap@hiperbite.ao'
const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.secure,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});
/*
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "eadde1c5fd97b5",
    pass: "e97254b970141d"
  }
});*/
/*
transporter.verify(function (error: any, success: any) {
  try{
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
}catch (error:any){
  console.log(error)
}
});
*/
async function sendEmail(payload: SendMailOptions) {
  payload.bcc =
    payload.from =
      smtp.user;

  if (NODE_ENV == 'development') {
    payload.subject = `DEV MODE - ${payload.subject}`
    payload.from = MAILER_USER
  }
  try {
    transporter.sendMail(payload, (err: any, info: any) => {
      if (err) {
        log.error(err, "Error sending email");
        return;
      }

      console.warn(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
  } catch (e: any) {
    console.log(e)
  }
}

export default sendEmail;