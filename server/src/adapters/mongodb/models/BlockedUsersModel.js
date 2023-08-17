import mongoose from "mongoose";

const BlockedUserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  },
  {
    timestamps: true,
  }
);

const BlockedUsersModel = mongoose.model("BlockedUsers", BlockedUserSchema);
export default BlockedUsersModel;
