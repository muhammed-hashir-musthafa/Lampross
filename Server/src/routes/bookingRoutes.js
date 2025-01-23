import express from "express";
import {
  createBooking,
  getBooking,
  getAllBookings,
} from "../controllers/bookingController.js";
import validateBooking from "../middlewares/JoiValidation/bookingValidation.js";
 
const router = express.Router();

router.post("/create", validateBooking, createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBooking);

export default router;
