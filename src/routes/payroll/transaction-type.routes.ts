
import express from "express";
import transactionTypeApi, { TransactionTypeApi } from "../../api/payroll/transaction-type.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createTransactionTypeSchema,
  updateTransactionTypeSchema,
} from "../../application/schema/index";


const routes = express.Router();

const router = express.Router();
const api: TransactionTypeApi = transactionTypeApi;
routes.post(
  "/",
  validateResource(createTransactionTypeSchema),
  api.create
);

routes.put(
  "/:id",
  validateResource(updateTransactionTypeSchema),
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

router.use('/transaction-types',routes) 

export default routes;