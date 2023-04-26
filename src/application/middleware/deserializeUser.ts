import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../jwt";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded :any = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    req.body.updatedById=decoded?.id;
  }
  //req.body.req=req;

  return next();
};

export default deserializeUser;
