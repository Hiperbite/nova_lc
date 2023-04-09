import { Request, Response } from "express";

import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../../application/schema";
import { Person, User } from "../../models/index";
import log from "../../application/logger";
import sendEmail, { mailServices } from "../../application/mailler/index";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../../repository/index";
import { UserApp } from "../../application/common/user.app";
import Repository, { Paginate } from "../../repository/repository";
import userRepository from "../../repository/common/user.repository";

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

  const user = await User.findOne({ where: { email }, include: [Person] });

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
    service: mailServices.forgotPassword,
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

export async function checkResetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const user = await User.findOne({ where: { id, passwordResetCode } });

  if (user) {
    return res.send(user);
  }
  return res.status(404).send("invalid credentials");
}

export async function getusers(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const {
    where,
    scope,
    page,
    pageSize,
  } = req.query
  const options: any = {
    where,
    scope,
    page,
    pageSize,
  }

  const repo = userRepository;

  const users: Paginate<User> | undefined = await repo.paginated(options);

  return res.send(users);
}

export const getUser = async (
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) => res.send(await User.scope('full').findByPk(req.params.id));
export async function getCurrent(
  req: Request,
  res: Response
) {
  const user = await User.scope('full').findByPk(res?.locals?.user?.id);

  return res.send(user);
}
export async function updateAvatar(
  req: Request,
  res: Response
) {
  const user = await User.scope('auth').findByPk(req?.body?.userId ?? res?.locals?.user?.id);
  if (user) {
    user.avatar = req.body.avatar
    user.save()
  }
  return res.send(user);
}
export async function updateUser(
  req: Request,
  res: Response
) {

  const { id } = req.params
  const { permissions } = req.body
  const user = await User.findByPk(id);
  if (user) {
    user.update(req.body)
    user.save()
    return res.send(user);
  }
  else {
    throw { code: 404 }
  }

}

export async function userHistory(
  req: Request,
  res: Response
) {

  const { id } = req.params

  const user = await User.findByPk(id);
  if (user) {
    const histories = await UserApp.history(user)

    return res.send(histories);
  } else
    res.status(404).send(null)


}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
