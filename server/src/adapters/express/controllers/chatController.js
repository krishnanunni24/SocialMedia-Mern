import ChatModel from "../../mongodb/models/chatModel.js";
import MessageModel from "../../mongodb/models/messageModel.js";

export const fetchChat = async (req, res) => {
  console.log("fetching Chats...");
  try {
    const chat = await ChatModel.find({ users: { $in: [req.params.userId] } })
      .sort({ updatedAt: -1 })
      .populate({
        path: "users",
        select: "_id profilePicture name username",
        match: { _id: { $ne: req.params.userId } },
      });
      if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(400).json({ message: "no chats found", data: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const fetchMessages = async (req, res) => {
  console.log("fetching messages");
  try {
    const chat = await ChatModel.findOne({
      users: { $all: [req.params.userId, req.params.receiverId] },
    })

    if (chat) {
      const messages = await MessageModel.find({
        chatId: chat._id,
      });
      console.log("Messages",messages)
      return res.status(200).json(messages);
    } else {
      return res.status(400).json({ message: "no chats found", data: null });
    }
  } catch (err) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const createMessage = async (req, res) => {
  console.log("Creating a new message...");
  try {
    console.log(req.body);
    const { receiverId, senderId, message } = req.body;
    const chat = await ChatModel.findOne({
      users: { $all: [receiverId,senderId] },
    });

    if (!chat) {
      const newChat = new ChatModel({
        users: [receiverId, senderId],
        // Add any other necessary properties for the new chat
      });
      const savedChat = await newChat.save();

      const newMessage = new MessageModel({
        chatId: savedChat._id,
        senderId,
        message,
      });
      await newMessage.save();
      savedChat.latestMessage = newMessage._id;
      await savedChat.save();

      console.log("New chat created:", savedChat);
      console.log("New message saved:", newMessage);

      res
        .status(200)
        .json({ message: "Message created successfully", newMessage });
    } else {
      const newMessage = new MessageModel({
        chatId: chat._id,
        senderId,
        message,
      });
      await newMessage.save();
      chat.latestMessage = newMessage._id;
      await chat.save();

      console.log("Existing chat found:", chat);
      console.log("New message saved:", newMessage);

      res
        .status(200)
        .json({ message: "Message created successfully", newMessage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
