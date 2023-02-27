import { Application, Response, Router } from "express";
import deserializeUser from "../application/middleware/deserializeUser";

import { StudentRepository } from "../repository";
import routes from "./routes";
export const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch((err: any) => {
    next(err);
  });

const router = (app: Application) => {
  /*app.get("/", async (req: any, res: Response) => {
    const { body, headers } = req;
    const now = new Date();
    const student = await new StudentRepository().all();
    //const student = await StudentRepository.create();
    return res.json({ body, now, headers, student });
  });
*/
  routes.get("/healthcheck", (_, res) => res.sendStatus(200));


  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
  // Your function  **must** take 4 parameters for Express to consider it
  // error handling middleware.
  app.use(({ status, err }: any, req: any, res: any, next: any) => {
    res.status(status).json(err);
  });

  app.get(
    "/",
    asyncHandler(async (req: any, res: any) => {
      throw new Error("Something went wrong!");
    })
  );

  app.use("/api/v1/", deserializeUser, routes);

  // Add more routes here

  // Error handler
  app.use(function (err: any, req: any, res: any, next: any) {
    // All errors from async & non-async route above will be handled here
    res.status(err.code).send(err.message);
  });
};

export default router;
