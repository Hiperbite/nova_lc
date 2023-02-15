import jwt from "jsonwebtoken";
import {
  accessTokenPrivateKey,
  accessTokenPublicKey,
  refreshTokenPrivateKey,
  refreshTokenPublicKey
} from "../config";

const Keys = { accessTokenPrivateKey, refreshTokenPrivateKey, accessTokenPublicKey, refreshTokenPublicKey }
export function signJwt(
  object: Object,
  //keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey" ,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey" | "accessTokenPublicKey" | "refreshTokenPublicKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    String(Keys[keyName]),
    "base64"
  ).toString("ascii");
  const myKey = Keys[keyName] ?? "";

  return jwt.sign(object, myKey, {
    ...(options && options),
    //algorithm: "RS512",
  });
}

export function verifyJwt<T>(
  token: string,
  //keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey" | "accessTokenPublicKey" | "refreshTokenPublicKey",
): T | null {

  const publicKey = Buffer.from(
    String(Keys[keyName]), "base64").toString(
      "ascii"
    );
  const myKey = Keys[keyName] ?? "";

  try {
    const decoded = jwt.verify(token, myKey /*publicKey*/) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}