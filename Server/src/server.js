import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import estimationRoutes from "./routes/estimateRoutes.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/booking", bookingRoutes);
app.use('/api/estimation', estimationRoutes);



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
