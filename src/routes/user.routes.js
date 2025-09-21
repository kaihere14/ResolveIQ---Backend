import { Router } from "express";
import {
  registerUser,
  loginUser,
  adminCode,
  userCode,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyADMIN } from "../middleware/verifyAdmin.js";
const router = new Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/adminPanel", verifyJWT, verifyADMIN, adminCode);
router.post("/userPanel", verifyJWT, userCode);
export default router;
