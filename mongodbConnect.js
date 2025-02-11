import mongoose from "mongoose";

export const connectMongoDB1 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DATABASE connected");
  } catch (err) {
    console.log("error in connecting mongo databsae");
  }
};
