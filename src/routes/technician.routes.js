import { Router } from "express";
import {
  fetchComplain,
  fetchTechnician,
} from "../controllers/technician.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = new Router();

router.get("/complainData", verifyJWT, fetchComplain);
router.get("/technicianData", verifyJWT, fetchTechnician);

export default router;
