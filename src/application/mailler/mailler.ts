import { logger } from './../logger';
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "../logger";
import { smtp, NODE_ENV, MAILER_USER, MY_NODE_ENV } from "../../config";
//const MAILER_USER='mailtrap@hiperbite.ao'
const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.secure,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },

  tls: {
    rejectUnauthorized: false
}
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

transporter.verify(function (err: any, success: any) {
  try {
    if (err) {
      console.log(err);
      logger.info(err)
    } else {
      logger.info('Server is ready to take our messages');
    }
  } catch (err: any) {
    logger.error(err)
  }
});

async function sendEmail(payload: SendMailOptions) {
  payload.bcc =
    payload.from =
    smtp.user;

  if (NODE_ENV !== 'production') {
    payload.subject = `${MY_NODE_ENV} MODE - ${payload.subject}`
    payload.from = MAILER_USER
  }
  try {
    transporter.sendMail(payload, (err: any, info: any) => {
      if (err) {
        logger.error(err)
        log.error(err, "Error sending email");
        return;
      }

      console.warn(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
  } catch (err: any) {
    logger.error(err)
  }
}

export default sendEmail;