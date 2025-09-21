import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const verifyADMIN = async (req, res, next) => {
  const { user } = req;
  try {
    if (!user) {
      throw new ApiError(409, "Unautharized request -2");
    }
    if (user.role != "admin") {
      throw new ApiError(409, "Unautharized Access");
    }
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal sever error" });
  }
};

export { verifyADMIN };
