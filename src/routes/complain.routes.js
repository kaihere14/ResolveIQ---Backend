import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyADMIN } from "../middleware/verifyAdmin.js";
import { compalainRegister } from "../controllers/complain.controller.js";

const router = new Router();

router.post("/register", verifyJWT, compalainRegister);

export default router;
