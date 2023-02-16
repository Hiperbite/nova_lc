import { Application, Response, Router } from "express";
import deserializeUser from "../application/middleware/deserializeUser";

import {StudentRepository} from "../repository";
import routes from "./routes"
const router = (app: Application) => {

    app.get("/", async (req: any, res: Response) => {
        const { body, headers } = req;
        const now = new Date();
        const student = await new StudentRepository().all();
        //const student = await StudentRepository.create();
        return res.json({ body, now, headers , student});
    });

    routes.get("/healthcheck", (_, res) => res.sendStatus(200));

    app.use("/api/v1/", deserializeUser, routes);

};


export default router;