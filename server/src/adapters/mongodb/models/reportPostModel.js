import mongoose, { mongo } from "mongoose";

const reportPostSchema = mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Users",required:true},
    reporters: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        reason: { type: String, required: true },
      }
    ],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);




var ReportPostModel = mongoose.model("ReportedPost", reportPostSchema);

export default ReportPostModel;
