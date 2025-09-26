import { Router } from "express";
import { send } from "../controllers/email.resend.js";
import {
  registerUser,
  loginUser,
  adminCode,
  userCode,
  fetchUsers,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyADMIN } from "../middleware/verifyAdmin.js";
const router = new Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/admin", verifyJWT, verifyADMIN, adminCode);
router.post("/userPanel", verifyJWT, userCode);
router.get("/fetchUser", verifyJWT, fetchUsers);
export default router;
