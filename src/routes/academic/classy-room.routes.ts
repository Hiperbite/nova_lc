
import express from "express";
import api from "../../api/academic/classy-room.api";

import validateResource from "../../application/middleware/validateResource";
import { createSchema, updateSchema } from "../../application/schema/academic/classRoom.schema";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../../application/schema/index";


const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// asyncHandler(
const router = express.Router()

  .post(
    "/",
    validateResource(createSchema),
    asyncHandler(api.create)
  )

  .put(
    "/:id",
    validateResource(updateSchema),
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