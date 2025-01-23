import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
    });
  }

  if (err.name === "EstimationError") {
    return res.status(400).json({
      error: "Estimation Error",
      message: err.message,
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  });
};

export const handleMulterError = (err, req, res, next) => {
  console.log(err,'loiej');
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files. Maximum is 5 files",
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }

  if (err) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }

  next();
};
