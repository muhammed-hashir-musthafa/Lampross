import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_DB_URL;
  try {
    const { connection } = await mongoose.connect(mongoUrl);
    console.log(`MongoDB connected :${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
