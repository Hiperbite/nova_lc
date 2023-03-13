import { Application, Response, Router } from "express";
import deserializeUser from "../application/middleware/deserializeUser";
import requireAuthentication from "../application/middleware/requireAuthentication";
import validateRequest from "../application/middleware/validateRequest";
import ejs from "ejs";
import routes from "./routes";
import { logger } from "../config";

export const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch((err: any) => {
    next(err);
  });

const router = (app: Application) => {
    
  app.get("/ip", (req: any, res: any) => res.send(req.ip));
  app.get(
    "/",
    asyncHandler(async (req: any, res: any) => {
      res.status(200).send("I'm alive")
    })
  );
  
  app.use(
    "/api/v1/",
    [deserializeUser, requireAuthentication, validateRequest],
    routes
  );

  // Add more routes here

  // Error handler
  app.use(function (err: any, req: any, res: any, next: any) {
    // All errors from async & non-async route above will be handled here
    let errors = [];

    /**
     *
     *
     * if err.original.code == 'ER_NO_REFERENCED_ROW_2'
     * err.table
     * [] err.fields not found
     *
     */
    if (err?.original?.code === "ER_NO_REFERENCED_ROW_2") {
      errors = [{ message: `${err.table} not founds`, fields: err.fields }];
    } else if (typeof err.message === "string") {
      errors = [{ message: err.message }];
    } else if (Array.isArray(err) && err.length > 0) {
      errors = err;
    } else if (Array.isArray(err)) {
      errors = [{ message: "Some thing wrong is happning" }];
    } else {
      errors = [err.data];
    }

    res.status(err.code ?? 500).send(errors);
    logger.error({message:errors, meta:{req,res}})
  });

  // Error handler
  // All errors from async & non-async route above will be handled here
  app.use((req: any, res: any, next: any) => {
    res.status(404).json([{ message: "resource not found" }]);
    logger.warn({ message: "resource not found" ,meta:{req,res}})
  });

  app.use((err: any, req: any, res: any, next: any) => {
    const { status } = err;
    res.status(status).json(err);
    logger.info({ message: err ,meta:{req,res}})
  });
};
export default router;
