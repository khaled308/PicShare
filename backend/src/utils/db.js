import mongoose from "mongoose";
import { DATABASE_URL } from "./constants.js";

const DBConnection = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default DBConnection;
