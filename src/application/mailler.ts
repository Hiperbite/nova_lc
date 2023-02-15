import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";
import { smtp, NODE_ENV } from "../config";

const transporter = nodemailer.createTransport({
  
    host: smtp.host,
    port: Number(smtp.port),
    secure: smtp.secure,
    auth: {
      user: smtp.user , 
      pass: smtp.pass , 
    },
  
});

async function sendEmail(payload: SendMailOptions) {
  payload.from=smtp.user;
  if(NODE_ENV=='development') {
    payload.subject=`DEV MODE - ${payload.subject}`
  }

  transporter.sendMail(payload, (err:any, info:any) => {
    if (err) {
      log.error(err, "Error sending email");
      return;
    }
    
    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;