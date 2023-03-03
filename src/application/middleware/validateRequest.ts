import { Request, Response, NextFunction } from "express";
const uuidPattern = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (req.params.id && !uuidPattern.test(req.params.id)) {
    throw { code: 400, message: `required a valid uuid param, ${req.params.id} given` }
  }

  return next();
};

export default validateRequest;
