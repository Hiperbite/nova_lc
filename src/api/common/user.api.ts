import { Request, Response } from "express";

import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../../application/schema";
import { User } from "../../models/index";
import log from "../../application/logger";
import sendEmail from "../../application/mailler";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../../repository/index";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await UserRepository.create(body);
    if (user) {
      await sendEmail({
        to: user.email,
        from: "test@example.com",
        subject: "Verify your email",
        text: `verification code: ${user.verificationCode}. Id: ${user.id}`,
      });
    }

    return res.send({ user });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exists");
    }

    return res.status(500).send(e);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationCode } = req.params;

  // find the user by id
  const user = await User.findByPk(id);

  if (!user) {
    return res.send("Could not verify user");
  }

  // check to see if they are already verified
  if (user.verified) {
    return res.send("User is already verified");
  }

  // check to see if the verificationCode matches
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    user.passwordResetCode = uuid().substring(0, 8).toUpperCase();

    await user.save();

    return res.send("User successfully verified");
  }

  return res.send("Could not verify user");
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const message =
    "If a user with that email is registered you will receive a password reset email";

  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    //log.debug(`User with email ${email} does not exists`);
    return res.send(message);
  }

  if (!user.verified) {
    // return res.send("User is not verified");
  }

  const passwordResetCode = uuid().substring(0, 8).toUpperCase();

  user.passwordResetCode = passwordResetCode;

  await user.save();
try {
  await sendEmail({
    to: user.email,
    from: "test@hiperbite.com",
    subject: "Reset your password",
    text: `Password reset code: ${passwordResetCode}. Id ${user.id}`,
  });
} catch (error) {
  const err=error
}
  

  log.debug(`Password reset email sent to ${email}`);

  return res.send(message);
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  const user = await User.findByPk(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send("Could not reset user password");
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send("Successfully updated password");
}

export async function getusers(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const users = await User.findAll();

  return res.send(users);
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
