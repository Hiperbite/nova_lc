
import express from "express";
import api from "../../api/common/track.api";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
  // asyncHandler(
const router = express.Router()

.get(
  "/:id",
  asyncHandler(api.find)
)

.get(
  "/",
  asyncHandler(api.findBy)
);

export default router;