import { updatePeriodSchema } from './../../application/schema/academic/period.schema';
import express from "express";
import api from "../../api/academic/academic-period.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createPeriodSchema,
  updateStudentSchema,
} from "../../application/schema/index";


const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// asyncHandler(

const router = express.Router()

  .post(
    "/",
    validateResource(createPeriodSchema),
    asyncHandler(api.create)
  )

  .put(
    "/:id",
    validateResource(updatePeriodSchema),
    asyncHandler(api.update)
  )

  .get(
    "/:id",
    asyncHandler(api.find)
  )

  .get(
    "/",
    asyncHandler(api.findBy)
  );

export default router;