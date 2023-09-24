import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof schema>;

const User = mongoose?.models?.User || mongoose.model<UserType>("User", schema);

export default User;
