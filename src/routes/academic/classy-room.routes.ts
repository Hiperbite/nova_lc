
import express from "express";
import api from "../../api/academic/classy-room.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../../application/schema/index";


const router = express.Router()

.post(
  "/",
  // validateResource(createStudentSchema),
  api.create
)

.put(
  "/:id",
  // validateResource(updateStudentSchema),
  api.update
)

.get(
  "/:id",
  api.find
)

.get(
  "/",
  api.findBy
);

export default router;