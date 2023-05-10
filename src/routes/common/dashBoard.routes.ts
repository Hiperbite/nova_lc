
import express from "express";
import api from "../../api/common/dashboards";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// asyncHandler(
const router = express.Router()
  .get(
    "/common",
    // validateResource(createStudentSchema),
    asyncHandler(api.common)
  )
  
  .get(
    "/registered",
    // validateResource(createStudentSchema),
    asyncHandler(api.registered)
  )
  
  .get(
    "/get-student-honor-roll",
    // validateResource(createStudentSchema),
    asyncHandler(api.getStudentHonorRoll)
  )
  
  .get(
    "/get-student-count",
    // validateResource(createStudentSchema),
    asyncHandler(api.getStudentCount)
  )
  ;

export default router;