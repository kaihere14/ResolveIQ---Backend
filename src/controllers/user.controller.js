import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { send } from "./email.resend.js";

const genAccessRefresh = async (username) => {
  const user = await User.findOne({ username });
  const accessToken = await user.genAccessToken(user);
  const refreshToken = await user.genRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!email || !password || !username) {
      throw new ApiError(409, "Enter all field");
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      throw new ApiError(404, "Username/email already registered");
    }
    const user2 = new User({
      username,
      email,
      password,
      role,
    });
    await user2.save();
    const response = await send(user2, password);
    return res
      .status(200)
      .json(new apiResponse(200, user2, "created succesfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new ApiError(409, "Both field req");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(404, "No account found");
    }
    const result = await user.passVerify(password);
    if (!result) {
      throw new ApiError(404, "Password incorrect");
    }
    const { accessToken, refreshToken } = await genAccessRefresh(username);

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { user, accessToken, role: user.role },
          "logged in "
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const adminCode = async (req, res) => {
  return res.status(200).json(new apiResponse(200, "Welcome admin"));
};
const userCode = async (req, res) => {
  return res.status(200).json(new apiResponse(200, "Welcome User"));
};

const fetchUsers = async (req, res) => {
  try {
    // Exclude users with role "admin"
    const userData = await User.find({}).select("username role id email");

    if (!userData.length) {
      throw new ApiError(404, "No user registered");
    }

    return res
      .status(200)
      .json(new apiResponse(200, userData, "fetched successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new apiResponse(error.statusCode || 500, null, error.message));
  }
};

export { registerUser, loginUser, adminCode, userCode, fetchUsers };
