import { getUser, userHistory } from './../../api/common/user.api';
import express from "express";
import {
  checkResetPasswordHandler,
  createUserHandler,
  forgotPasswordHandler,
  getCurrent,
  getCurrentUserHandler,
  getusers,
  resetPasswordHandler,
  updateAvatar,
  updateUser,
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

router.get(
  "/resetpassword/:id/:passwordResetCode",
  //validateResource(resetPasswordSchema),
  checkResetPasswordHandler
);
router.post(
  "/upload-avatar",
  requireUser, asyncHandler(updateAvatar)
);
router.put(
  "/:id",
  requireUser, asyncHandler(updateUser)
);
router.get(
  "/:id",
  requireUser, asyncHandler(getUser)
);
router.get(
  "/histories/:id",
  requireUser, asyncHandler(userHistory)
);

router.get("/me", requireUser, asyncHandler(getCurrent));

export default router;