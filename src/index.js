import { connectDB } from "./database/index.js";
import express from "express";
import "dotenv/config";
import { apiResponse } from "./utils/apiResponse.js";

const app = express();
app.use(express.json());
const port = 3000;

import user from "./routes/user.routes.js";
app.use("/api/users", user);

const trying = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("failed to start server ");
    process.exit(1);
  }
};

trying();
