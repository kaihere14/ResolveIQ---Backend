import User from "../models/user.model.js";
import Complain from "../models/complain.model.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const fetchComplain = async (req, res) => {
  const { user } = req;
  const id = user._id;

  try {
    if (!user) {
      throw new ApiError(409, "Unable to get technician id");
    }

    const complains = await Complain.aggregate([
      {
        $match: { technicianId: id }, // filter by technician
      },
      {
        $lookup: {
          from: "users", // collection name for User model
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: "$userData", // convert array -> object
      },
      {
        $project: {
          title: 1,
          description: 1,
          technicianId: 1,
          activeStatus: 1,
          "userData._id": 1,
          "userData.name": 1,
          "userData.email": 1,
        },
      },
    ]);

    if (!complains || complains.length === 0) {
      throw new ApiError(404, "No complaints found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, complains, "Complaints fetched successfully"));
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

export { fetchComplain, fetchTechnician };
