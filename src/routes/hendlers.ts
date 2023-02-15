import {Request, NextFunction, Response } from "express";

import { ApiError } from "./error.handler";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) return res.status(err.code).send(err.message);

  return res.status(500).send(err);
};

export default errorHandler;
export { ApiError };