import { Application, Response, Router } from "express";
import deserializeUser from "../application/middleware/deserializeUser";

import {EmployeeRepository} from "../repository";
import routes from "./routes"
const router = (app: Application) => {

    app.get("/", async (req: any, res: Response) => {
        const { body, headers } = req;
        const now = new Date();
        const employee = await new EmployeeRepository().all();
        //const employee = await EmployeeRepository.create();
        return res.json({ body, now, headers , employee});
    });

    routes.get("/healthcheck", (_, res) => res.sendStatus(200));

    app.use("/api/v1/", deserializeUser, routes);

};


export default router;