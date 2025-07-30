import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, payload) => {

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is missing" });
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("side_to_side", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    overwrite: true,
  });

  return token;
};

export default generateTokenAndSetCookie;
