import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  getusers,
  resetPasswordHandler,
  verifyUserHandler,
} from "../../api/common/user.api";
import requireUser from "../../application/middleware/requireAuthentication";
import validateResource from "../../application/middleware/validateResource";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../../application/schema";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
  // asyncHandler(
const router = express.Router();

router.post(
  "/",
  validateResource(createUserSchema),
  asyncHandler(createUserHandler)
);
router.get(
  "/",
  asyncHandler(getusers)
);

router.post(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  asyncHandler(verifyUserHandler)
);

router.post(
  "/forgotpassword",
  validateResource(forgotPasswordSchema),
  asyncHandler(forgotPasswordHandler)
);

router.post(
  "/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get("/me", requireUser, asyncHandler(getCurrentUserHandler));

export default router;