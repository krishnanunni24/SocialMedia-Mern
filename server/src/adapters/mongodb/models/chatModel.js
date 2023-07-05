import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId_1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userId_2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;