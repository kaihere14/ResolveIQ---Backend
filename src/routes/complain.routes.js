import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyADMIN } from "../middleware/verifyAdmin.js";
import {
  compalainRegister,
  complainFetch,
  oneComplain,
  changeStatus,
  addTech,
  userComplain,
} from "../controllers/complain.controller.js";

const router = new Router();

router.post("/register", verifyJWT, compalainRegister);
router.get("/fetch", verifyJWT, verifyADMIN, complainFetch);
router.get("/userComplains", verifyJWT, userComplain);
router.post("/getOne", verifyJWT, verifyADMIN, oneComplain);
router.post("/changeStatus", verifyJWT, verifyADMIN, changeStatus);
router.post("/addtech", verifyJWT, verifyADMIN, addTech);

export default router;
