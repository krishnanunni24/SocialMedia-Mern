import mongoose from "mongoose";
import ReportPostModel from "./reportPostModel.js";
import LikeModel from "./likesModel.js"; 

const postSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"Users",required: true },
    likes: {type:Number,default:0},
    comments: {type:Number,default:0},
    shares:{type:Number,default:0},
    unlisted:{type:Boolean,default:false},
    image: {type:String,required:true},
    caption:{type:String ,required:true},
  },
  {
    timestamps: true,
  }
);



postSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    // Delete associated reports when the post is deleted
    await ReportPostModel.findOneAndDelete({ postId: doc._id });
  }
});

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
