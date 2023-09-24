// getUserData.js
import { MongoClient, ObjectId } from "mongodb";

type UserData = {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null | undefined;
};

export const getUserData = async (email: string | null | undefined) => {
  const client = await MongoClient.connect(process.env.MONGO_URL!);
  const db = client.db("blogwebsite");
  const userData = (await db
    .collection("users")
    .findOne({ email })) as UserData;

  return userData;
};
