import mongoose from 'mongoose';
import env from "./env";

// This function establishes the connection to the MongoDB database.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1); // Exit with a failure code if the connection fails.
  }
};

export default connectDB;