
import express from "express";
import transactionTypeApi, { PaypackApi } from "../../api/payroll/paypack.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createPaypackSchema,
  updatePaypackSchema,
} from "../../application/schema/index";


const routes = express.Router();

const api: PaypackApi = transactionTypeApi;
routes.post(
  "/",
  validateResource(createPaypackSchema),
  api.create
);

routes.put(
  "/:id",
  validateResource(updatePaypackSchema),
  api.update
);

routes.get(
  "/:id",
  api.find
);

routes.get(
  "/",
  api.findBy
);


export default routes;