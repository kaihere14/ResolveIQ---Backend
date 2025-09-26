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

export { compalainRegister };
