const errorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  const response = {
    success: false,
    message,
    statusCode,
  };

  if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
    response.errors = err.errors;
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;