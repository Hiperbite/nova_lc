import { Assessment, Enrollment, Model, Notification, Person, Staff, Student, Track, User } from "../../models/index";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import sendEmail, { mailServices } from "../mailler/index";
import { Op } from "sequelize";

export type NotificationType =
  "pop" |
  "email" |
  "sms"
  ;

export class NotificationApp {

  static create = (model: Model) => {
    const text = 'Foi registado um novo ' + model.constructor.name

    Notification.create(
      {
        model: model.constructor.name,
        ref: model.id,
        userId: model.updatedById ,
        updatedById: model.updatedById ,
        text,
        sentBy: ['pop', 'email', 'sms']
      }
    )

  };

  static sendMail = async (user: User) =>
    null;
  static createUser = async (user: User) =>
    sendEmail(
      {
        service: mailServices.createUser,
        data: user
      })

  static initVer = async (user: User) => {
    user.verificationCode = uuid().substring(5, 12).toUpperCase();
    user.verified = true;
  };

}
