// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // this will store the bcrypt hash, not the plain password
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

const User = mongoose.model("User", userSchema);

export default User;