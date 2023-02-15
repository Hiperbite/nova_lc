
import express from "express";
import employeeApi, { EmployeeApi } from "../../api/employee/employee.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../../application/schema/index";


const router = express.Router();
const api: EmployeeApi = employeeApi;
router.post(
  "/",
  validateResource(createEmployeeSchema),
  api.create
);

router.put(
  "/:id",
  validateResource(updateEmployeeSchema),
  api.update
);

router.get(
  "/:id",
  api.find
);

router.get(
  "/",
  api.findBy
);

export default router;