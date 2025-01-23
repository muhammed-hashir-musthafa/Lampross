import express from "express";
import {
  createCompanyProfile,
  getAllCompanies,
  getCompany,
  updateCompanyProfile,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompany);
router.post("/profile", createCompanyProfile);
router.put("/profile/:id", updateCompanyProfile);

export default router;
