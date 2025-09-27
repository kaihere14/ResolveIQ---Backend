import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import Complain from "../models/complain.model.js";
import { update } from "./email.resend.js";
import mongoose from "mongoose";

const compalainRegister = async (req, res) => {
  const { description, title, status } = req.body;
  const { user } = req;
  try {
    if (!user || !description || !title) {
      throw new ApiError(409, "Unavailable to proccess all fields are req");
    }

    const complain = new Complain({
      title,
      description,
      status,
      user,
    });

    const saved = await complain.save();
    if (!saved) {
      throw new ApiError(404, "Failed to create your complain");
    }

    return res
      .status(200)
      .json(new apiResponse(200, complain, "Complain registered successfully"));
  } catch (error) {
    return res.status(error.statusCode || error.statusCode).json(
      new ApiError(error.statusCode, {
        message: error.message || "Internal server error",
      })
    );
  }
};
const complainFetch = async (req, res) => {
  const { user } = req;
  try {
    if (!user) {
      throw new ApiError(404, "Unbale to find the user");
    }
    const complain = await Complain.aggregate([
      {
        $lookup: {
          from: "users", // The collection to join with
          localField: "user", // Field from the input documents
          foreignField: "_id", // Field from the documents of the "from" collection
          as: "userDetails", // Output array field
        },
      },
      {
        $unwind: "$userDetails", // Deconstructs the userDetails array into individual documents
      },
      {
        $project: {
          "userDetails.password": 0, // Exclude password from user details
          "userDetails.refreshToken": 0, // Exclude refreshToken from user details
        },
      },
    ]);
    if (!complain) {
      throw new ApiError(404, "no complain found");
    }
    return res
      .status(200)
      .json(new apiResponse(200, complain, "Fetched Successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new apiResponse(error.statusCode || 500, null, error.message));
  }
};

const oneComplain = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      throw new ApiError(409, "Unable to open the complain");
    }
    const complain = await Complain.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users", // The collection to join with
          localField: "user", // Field from the input documents
          foreignField: "_id", // Field from the documents of the "from" collection
          as: "userDetails", // Output array field
        },
      },
      {
        $unwind: "$userDetails", // Deconstructs the userDetails array into individual documents
      },
      {
        $project: {
          "userDetails.password": 0, // Exclude password from user details
          "userDetails.refreshToken": 0, // Exclude refreshToken from user details
        },
      },
    ]);
    if (!complain) {
      throw new ApiError(404, "Failed to find the complain");
    }
    return res
      .status(200)
      .json(new apiResponse(200, complain, "complain opened successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const changeStatus = async (req, res) => {
  const { status, id } = req.body;
  try {
    if (!status || !id) {
      throw new ApiError(409, "Undefined status");
    }
    const complain = await Complain.findById(id);
    const userId = complain.user;
    const userDetails = await User.findById(userId);
    if (!complain) {
      throw new ApiError(404, "Unable to get complain");
    }
    complain.activeStatus = status;
    await complain.save({ validateBeforeSave: false });
    const mail = await update(userDetails, complain.activeStatus);
    return res
      .status(200)
      .json(new apiResponse(200, complain, "status updated successfuly"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.statusCode || error.statusCode,
          error.message || "Internal server error"
        )
      );
  }
};
export { compalainRegister, complainFetch, oneComplain, changeStatus };
