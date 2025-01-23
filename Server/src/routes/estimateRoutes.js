import express from "express";
import validateEstimation from "../middlewares/JoiValidation/estimationValidation.js";
import { calculateEstimate } from "../controllers/estimateController.js";
 
const router = express.Router();

router.post("/calculate", validateEstimation, calculateEstimate);

export default router;
