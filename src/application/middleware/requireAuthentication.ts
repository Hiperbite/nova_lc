import { Request, Response, NextFunction } from "express";

const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whiteList = ["/auth",'/auth/refresh',"/users/forgotpasswor", "/users/resetpassword", "/users/resetpassword"];

  if (whiteList.includes(req.url.substring(0,20))) {
    return next();
  }

  const user = res.locals.user;

  if (!user) {
    return res.status(403).send([{message:'unauthorized'}]);
  }

  return next();
};

export default requireAuthentication;
