import mongoose from "mongoose";

const followersSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    followers: [],
  },
  {
    timestamp: true,
  }
);

const FollowersModel = mongoose.model("followers", followersSchema);
export default FollowersModel;
