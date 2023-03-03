import { Application, Response, Router } from "express";
import deserializeUser from "../application/middleware/deserializeUser";
import requireAuthentication from "../application/middleware/requireAuthentication";
import validateRequest from "../application/middleware/validateRequest";

import { StudentRepository } from "../repository";
import routes from "./routes";
export const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch((err: any) => {
    next(err);
  });

const router = (app: Application) => {
  routes.get("/healthcheck", (_, res) => res.status(200).send("I am alive"));
  /*
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    });*/
  // Your function  **must** take 4 parameters for Express to consider it
  // error handling middleware.

  app.use(
    "/api/v1/",

    [deserializeUser, requireAuthentication, validateRequest],
    routes
  );

  // Add more routes here

  // Error handler
  app.use(function (err: any, req: any, res: any, next: any) {
    // All errors from async & non-async route above will be handled here
    let errors = []
    if (typeof err.message === 'string') {
      errors = [{ message: err.message }]
    } else if (Array.isArray(err)) {
      errors = err;
    }
    else {
      errors = [err.data]
    }

    res.status(err.code ?? 500).send(errors);
  });
  // Error handler
  app.use((req: any, res: any, next: any) => {
    // All errors from async & non-async route above will be handled here
    res.status(404).json([{ message: 'resource not found' }]);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    const { status, error } = err
    res.status(status).json(err);
  });

  app.get(
    "/",
    asyncHandler(async (req: any, res: any) => {
      throw new Error("Something went wrong!");
    })
  );
  
};
export default router;
