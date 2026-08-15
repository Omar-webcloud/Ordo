import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate a JWT for an authenticated user
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

/**
 * Verify a JWT
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};