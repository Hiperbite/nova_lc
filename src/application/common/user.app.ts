import { User } from "../../models/index";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import sendEmail from "../../application/mailler";

export class UserApp {
  
  static hashPassword = async (user: User) => {

    if ((user.changed() || []).filter(x => x === 'password').length === 0)
      return;

    const saltRounds = 10;
    try {
      // Generate a salt
      user.salt = await bcrypt.genSalt(saltRounds);

      // Hash password
      user.password = await bcrypt.hash(user.password ?? "", user.salt);

      console.log(user.password);
    } catch (error) {
      console.log(error);
    }
  };

  static sendMail = async (user: User) =>
    await sendEmail({
      to: user.email,
      from: "test@example.com",
      subject: "Verify your email",
      text: `verification code: ${user.verificationCode}. Id: ${user.id}`,
    });

  static initVer = async (user: User) => {
    user.verificationCode = uuid().substring(5, 12).toUpperCase();
    user.verified = true;
  };

}
