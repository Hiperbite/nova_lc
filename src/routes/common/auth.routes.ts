import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../../api/common/auth.api";
import validateResource from "../../application/middleware/validateResource";
import { createSessionSchema } from "../../application/schema";

const router = express.Router();

router.post(
  "/",
  validateResource(createSessionSchema),
  createSessionHandler
);

router.post("/refresh", refreshAccessTokenHandler);

export default router;