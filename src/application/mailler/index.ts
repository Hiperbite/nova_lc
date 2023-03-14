import send from "./mailler";
import ejs from "ejs";
import path from "path";

const mailServices = {
  createUser: {
    template: "createUser",
    subject: "Be welcome",
  },
  createStudent: {
    template: "student/createStudent",
    subject: "Seja bem vindo ao Nova academico",
  },
  createEnrollment: {
    template: "student/createEnrollment",
    subject: "Matricula feita com sucesso",
  },
  forgotPassword: {
    template: "forgotPassword",
    subject: "Reset your password",
  },
};

const sendEmail = async ({ service, data }: { service: any; data: any }) => {
  ejs.renderFile(layout, { data, ...service }, (err: any, html: any) => {
    const payload = {
      to: data.email,
      ...data,
      html,
      ...service,
    };
    if (html) {
      send(payload);
    } else {
      let u = html;
    }
  });
};
const layout = path.resolve(
  __dirname + "/../../helpers/mailer/templates/layout.html.ejs_"
);
const render = () => {};
export { mailServices };
export default sendEmail;
