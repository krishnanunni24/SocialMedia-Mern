import mongoose from "mongoose";

const followingSchema = mongoose.Schema(
  {
        userId: {
      type: String,
      required:true
    },
    following: [],
},
{

    timestamp:true,
}
);

const FollowingModel = mongoose.model("Following", followingSchema);
export default FollowingModel;
