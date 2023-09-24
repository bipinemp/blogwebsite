import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  const URL = String(process.env.MONGO_URL);
  try {
    if (mongoose.connection.readyState === 0) {
      const conn = await mongoose.connect(URL);
      console.log(`Connected to DB : ${conn.connection.host}`);
    } else {
      console.log("Already connection to DB");
    }
  } catch (error) {
    console.log(`Error : ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectToDB;
