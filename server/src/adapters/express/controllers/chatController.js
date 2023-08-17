import ChatModel from "../../mongodb/models/chatModel.js";
import MessageModel from "../../mongodb/models/messageModel.js";

export const fetchChat = async (req, res) => {
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
  try {
    const chat = await ChatModel.findOne({
      users: { $all: [req.params.userId, req.params.receiverId] },
    })

    if (chat) {
      const messages = await MessageModel.find({
        chatId: chat._id,
      });
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
  try {
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


      res
        .status(200)
        .json({ message: "Message created successfully", newMessage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMessageStatus=async(req,res)=>{
  const{userId,status}=req.body
  try{
   const chats = await ChatModel.find({users:userId}).select("_id")
   const filter = {
    chatId: { $in: chats }, // Find messages with chatIds in the provided array
    senderId: { $ne: userId }, // Find messages where senderId is not equal to userId
    status:{$ne:"read"}
  };

  const update = {
    $set: {status}
  };
await MessageModel.updateMany(filter,update).then((response)=>{
  console.log(response)
  return res.status(200).json({message:"updated to delivered"})
})


  }catch(err){
  console.log(err)
  return res.status(500).json(err)
  }
}

export const getChatNotification =async(req,res)=>{
 const {userId,chatId}=req.params
 console.log(req.params)
 try{
  const filter = {
    chatId,
    senderId:{$ne:userId}
    ,status:{$ne:"read"}
  }
  const count = await MessageModel.countDocuments(filter);
  console.log("count:",count)
  return res.status(200).json(count || 0)
 }catch(err){
  console.error(err)
  return res.status(500).json(err)
 }
}
