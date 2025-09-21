import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected succesfully");
    return con;
  } catch (error) {
    console.log("Failed to connect database");
    process.exit(1);
  }
};

export { connectDB };
