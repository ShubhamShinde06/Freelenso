import User from "../models/user.model.js";
import ErrorHandler from "../utils/error.utils.js";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { encrypt } from "../utils/crypto.js";
import jwt  from "jsonwebtoken";

const generateEncryptedSessionId = () => {
  const sessionId = crypto.randomUUID();
  return encrypt(sessionId);
};

export const userPost = async (req, res) => {
  const { userData } = req.body;
  const { uid, userEmail, userName, userPhoto, emailVerified } = userData;

  if (!uid || !userEmail || emailVerified === undefined) {
    return ErrorHandler(res, "Missing user info", 400);
  }

  try {
    const sessionId = generateEncryptedSessionId();

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        userEmail,
        userName,
        userPhoto,
        emailVerified,
        sessionId,
      });
    } else {
      user.sessionId = sessionId;
      await user.save();
    }

    const payload = {
      userID: user?._id,
      sessionID: sessionId,
    };

    const token = generateTokenAndSetCookie(res, payload);

    return res.status(200).json({
      success: true,
      message: "Authenticated",
      sessionId,
      token,
    });
  } catch (error) {
    return ErrorHandler(res, "Auth Post Server Down", error.message, 500);
  }
};

export const userVerify = async (req, res) => {
  const token = req.cookies?.side_to_side;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userIdFromToken = decoded?.userID;
    const sessionIdFromToken = decoded?.sessionID;

    if (!userIdFromToken || !sessionIdFromToken) {
      return ErrorHandler(res, "Invalid token payload", 400);
    }

    // Find user in DB
    const user = await User.findById(userIdFromToken);

    if (!user || user.sessionId !== sessionIdFromToken) {
      return ErrorHandler(res, "Invalid or expired session", 401);
    }

    return res.status(200).json({
      success: true,
      message: "User verified",
      user: {
        userEmail: user.userEmail,
        userName: user.userName,
        userPhoto: user.userPhoto,
        _id: user._id,
      },
    });
  } catch (error) {
    return ErrorHandler(res, "Verification failed", 500, error.message);
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("side_to_side", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


