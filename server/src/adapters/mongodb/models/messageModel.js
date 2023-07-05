import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Chat',
        },
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        receiverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        message_text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel