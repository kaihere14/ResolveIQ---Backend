import { Router } from "express";
import {
  fetchComplain,
  fetchTechnician,
  changeStatus,
} from "../controllers/technician.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = new Router();

router.get("/complainData", verifyJWT, fetchComplain);
router.get("/technicianData", verifyJWT, fetchTechnician);
router.post("/changeStatus", verifyJWT, changeStatus);

export default router;
