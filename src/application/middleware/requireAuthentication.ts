import { Request, Response, NextFunction } from "express";

const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whiteList = ["/auth","/users/forgotpasswor", "/users/resetpassword", "/users/resetpassword"];
return next();
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
