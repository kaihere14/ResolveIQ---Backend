import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.passVerify = async function (password) {
  const result = bcrypt.compare(password, this.password);
  return result;
};

UserSchema.methods.genAccessToken = async function (user) {
  const accessToken = jwt.sign(
    {
      data: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
  return accessToken;
};

UserSchema.methods.genRefreshToken = async function (user) {
  const refreshToken = jwt.sign(
    {
      data: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7day" }
  );
  return refreshToken;
};

export default mongoose.model("User", UserSchema);
