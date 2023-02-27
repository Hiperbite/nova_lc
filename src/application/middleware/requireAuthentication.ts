import { Request, Response, NextFunction } from "express";

const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whiteList = ["/auth","/users/forgotpassword", "/users/resetpassword"];

  if (whiteList.includes(req.url)) {
    return next();
  }

  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireAuthentication;
