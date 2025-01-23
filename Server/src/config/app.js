import cors from "cors";
import morgan from "morgan";
import express from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
// app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
