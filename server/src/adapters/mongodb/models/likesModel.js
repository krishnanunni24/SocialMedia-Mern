import mongoose from "mongoose"
const LikeSchema = mongoose.Schema(
    {
      postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts",
        required:true,
      } ,
      LikedUsers:[{
       type :mongoose.Schema.Types.ObjectId,
       ref:"Users",
      }],
    }
    )

    const LikeModel = mongoose.model("Like" ,LikeSchema)
    export default LikeModel;