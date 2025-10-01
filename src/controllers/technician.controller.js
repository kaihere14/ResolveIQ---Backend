import User from "../models/user.model.js";
import Complain from "../models/complain.model.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { update } from "./email.resend.js";

const fetchComplain = async (req, res) => {
  const { user } = req;
  const id = user._id;
  try {
    if (!user) {
      throw new ApiError(409, "unable to get technician id");
    }
    const complain = await Complain.find({ technicianId: String(id) })
      .select("title description user technicianId activeStatus")
      .populate({ path: "user", select: "-password -refreshToken" });
    if (!complain) {
      throw new ApiError(404, "No complaints found");
    }
    return res
      .status(200)
      .json(new apiResponse(200, complain, "Complain fetched successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.statusCode || 500,
          error.message || "Internal server error"
        )
      );
  }
};

const fetchTechnician = async (req, res) => {
  const { user } = req;
  return res
    .status(200)
    .json(new apiResponse(200, user, "Technician fetched successfully"));
};

const changeStatus = async (req, res) => {
  const { id, verifyOtp } = req.body;
  try {
    if (!id || !verifyOtp) {
      throw new ApiError(409, "Complain id or verifyOtp not found");
    }
    const complain = await Complain.findById(id);
    if (complain.verifyOtp != Number(verifyOtp)) {
      throw new ApiError(409, "Invalid verifyOtp");
    }
    const user = await User.findById(complain.user);
    complain.activeStatus = "completed";
    await complain.save({ validateBeforeSave: false });
    const mail = await update(user, complain.activeStatus);
    return res
      .status(200)
      .json(new apiResponse(200, complain, "Status updated successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.statusCode || 500,
          error.message || "Internal server error"
        )
      );
  }
};
export { fetchComplain, fetchTechnician, changeStatus };
