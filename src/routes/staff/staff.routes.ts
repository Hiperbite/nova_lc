import express from "express";
import api from "../../api/staff/staff.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createStaffSchema,
  updateStaffSchema,
} from "../../application/schema/index";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = express
  .Router()

  .post("/", validateResource(createStaffSchema), asyncHandler(api.create))

  .put("/:id", validateResource(updateStaffSchema), asyncHandler(api.update))

  .get("/:id", asyncHandler(api.find))

  .get("/", asyncHandler(api.findBy));

export default router;
