import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Authentication token is missing");
    }

    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Authentication token has expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid authentication token"));
    }

    next(error);
  }
};

export default authMiddleware;