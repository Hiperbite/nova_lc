import { Request, Response } from "express";

import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../../application/schema";
import { Person, User } from "../../models/index";
import log from "../../application/logger";
import sendEmail,{mailServices} from "../../application/mailler/index";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../../repository/index";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

    const user = await UserRepository.create(body);


    return res.send({ user });

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

  const user = await User.findOne({ where: { email } , include:[Person]});

  if (!user) {
    log.debug(`User with email ${email} does not exists`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send("User is not verified");
  }

  const passwordResetCode = uuid().substring(0, 8).toUpperCase();

  user.passwordResetCode = passwordResetCode;

  await user.save();
  
  await sendEmail({
    service: mailServices['forgotPassword'],
    data: user,      
  });
  
  console.warn(`Password reset code: ${passwordResetCode}. Id ${user.id}`);

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
  const users = await User.findAll({ include: { all: true, nested: true } });

  return res.send(users);
}
export async function getCurrent(
  req: Request,
  res: Response
) {
  const users = await User.findByPk(res?.locals?.user?.id, { include: { all: true, nested: true } });

  return res.send(users);
}
export async function updateAvatar(
  req: Request,
  res: Response
) {
  const user = await User.findByPk(res?.locals?.user?.id, { include: { all: true, nested: true } });
  if (user) {
    user.avatar = req.body.avatar
    user.save()
  }
  return res.send(user);
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
