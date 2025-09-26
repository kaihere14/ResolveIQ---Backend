import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import Complain from "../models/complain.model.js";

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
export { compalainRegister, complainFetch };
