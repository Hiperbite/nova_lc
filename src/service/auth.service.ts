
import { omit } from "lodash";
import { signJwt } from "../application/jwt";
import { Session, User } from "../models/index";


export async function createSession({ userId }: { userId: string }) {
  return Session.create({ userId });
}

export async function findSessionById(id: string) {
  return Session.findByPk(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session.id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export function signAccessToken(user: User) {
  const payload = omit(user.toJSON(), User.privateFields);

  const accessToken = signJwt(payload, "accessTokenPublicKey" /* "accessTokenPrivateKey"*/, {
    expiresIn: "15m",
  });

  return accessToken;
}