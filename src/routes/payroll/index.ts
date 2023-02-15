import { Router } from "express";
import transactionTypeRoutes from "./transaction-type.routes";
import paypackRoutes from "./paypack.routes";

const routes = Router();

routes.use('/transaction-types',transactionTypeRoutes) 
routes.use('/paypacks',paypackRoutes) 

export default routes;