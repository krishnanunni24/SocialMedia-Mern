import mongoose from "mongoose";
const followingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ]
  },
  {
    timestamps: true
  }
);


const FollowingModel = mongoose.model("Following", followingSchema);
export default FollowingModel;
