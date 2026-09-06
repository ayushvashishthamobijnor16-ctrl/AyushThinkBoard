import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,  // fail fast if Atlas is unreachable
      socketTimeoutMS: 10000,          // kill hanging queries after 10s
    });

    console.log("MONGODB CONNECTED SUCCESSFULLY!");

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected!");
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB error:", error);
    });

  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};

export default connectDB;