import express from "express";
import {
  addProduct,
  getProduct,
  // updateProduct,
  // deleteProduct,
  getAllProducts,
  // getFilteredAndSortedProducts,
} from "../controllers/productController.js";
import { upload } from "../config/cloudinary.js";
import { handleMulterError } from "../middlewares/errorHandler.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
// router.get("/filter", getFilteredAndSortedProducts);
router.post("/", upload.array("images", 5), handleMulterError, addProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;
