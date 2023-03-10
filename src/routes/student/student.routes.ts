import express from "express";
import api from "../../api/student/student.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../../application/schema/index";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = express
  .Router()

  .post("/", validateResource(createStudentSchema), asyncHandler(api.create))

  .put("/:id", validateResource(updateStudentSchema), asyncHandler(api.update))

  .get("/:id", asyncHandler(api.find))

  .get("/", asyncHandler(api.findBy));

export default router;
