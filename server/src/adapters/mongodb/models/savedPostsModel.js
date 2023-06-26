import mongoose from "mongoose";

const savedPostSchema = mongoose.Schema(
    {
        userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
        },
        posts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Posts"
            }
        ],
        
    }
)

const SavedPostsModel = mongoose.model("SavedPosts",savedPostSchema)
export default SavedPostsModel;         