import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true, unique: true },
    userName: String,
    userPhoto: String,
    userAddress: String,
    emailVerified: Boolean,
    sessionId: String, 
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
