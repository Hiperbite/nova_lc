
import express from "express";
import studentApi, { StudentApi } from "../../api/student/student.api";

import validateResource from "../../application/middleware/validateResource";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../../application/schema/index";


const router = express.Router();
const api: StudentApi = studentApi;
router.post(
  "/",
  validateResource(createStudentSchema),
  api.create
);

router.put(
  "/:id",
  validateResource(updateStudentSchema),
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