import express from "express";
import { HelperApi } from "../../api/common/helper.api";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// asyncHandler(
const router = express.Router();

interface modelsType {
  key: string;
  model: any;
}

let api = new HelperApi();

router
  .get(
    `/download`,
    // validateResource(createStudentSchema),
    asyncHandler(api.fileDownload)
  )

router
  .get(
    `/permissions`,
    // validateResource(createStudentSchema),
    asyncHandler(api.permissions)
  )
export default router;
