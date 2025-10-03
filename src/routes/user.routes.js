import { Router } from "express";
import { send } from "../controllers/email.resend.js";
import {
  registerUser,
  loginUser,
  adminCode,
  userCode,
  fetchUsers,
  refreshAccess,
  checkRole,
  oneUser,
  changePass,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyADMIN } from "../middleware/verifyAdmin.js";
const router = new Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccess);
router.get("/admin", verifyJWT, verifyADMIN, adminCode);
router.get("/adminProfile", verifyJWT, oneUser);
router.post("/userPanel", verifyJWT, userCode);
router.post("/changePass", verifyJWT, changePass);
router.get("/fetchUser", verifyJWT, fetchUsers);
router.get("/checkRole", verifyJWT, checkRole);
export default router;
