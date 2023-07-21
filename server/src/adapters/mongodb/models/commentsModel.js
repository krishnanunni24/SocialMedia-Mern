import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
    default: null,
  }
 
},
{
    timestamps: true
  }
);

const CommentModel = mongoose.model('Comments', commentSchema);

export default CommentModel;
