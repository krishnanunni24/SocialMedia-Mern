import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
   users:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    }
   ],
   latestMessage: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
  },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;