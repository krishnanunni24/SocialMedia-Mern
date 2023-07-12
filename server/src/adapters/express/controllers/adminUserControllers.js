import UserModel from "../../mongodb/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ReportPostModel from "../../mongodb/models/reportPostModel.js";
import PostModel from "../../mongodb/models/postModel.js";
import BlockedUsersModel from "../../mongodb/models/blockedModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users) {
      return res.status(200).json({ users });
    } else {
      return res.status(400).json({ message: "NO users found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const blockUser = async (req, res) => {
  console.log("block user")
  try {
    const userId = req.body.id;
    const blocked = req.body.blocked;

    if(blocked){
            // Create a new BlockedUser entry
            const blockedUser = await BlockedUsersModel.create({
              userId: userId,
            });
      
            
            console.log(blockedUser, "blockedUser");
    }else{
      // Remove the BlockedUser entry if unblocking
      const deletedBlockedUser = await BlockedUsersModel.findOneAndDelete({
        userId: userId,
      });

      console.log("User unblocked");
    }
    
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isBlocked: blocked } }
    );

    console.log(user, "user");
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ message: "No users found" });
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message });
  }
};

export const fetchReportedPosts = async (req, res) => {
  console.log("fetching reports....");
  try {
    const reports = await ReportPostModel.find()
      .populate({
        path: "userId",
        select: "username profilePicture",
      })
      .populate({
        path: "reporters.userId",
        select: "username profilePicture", // Select the desired fields from the 'Users' model
      })
      .populate({
        path: "postId",
        select: "caption image likes comments shares unlisted", // Select the desired fields from the 'Posts' model
      });

    res.status(200).json({ reports });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const unListPost = async (req, res) => {
  const { postId } = req.params;
  console.log("unlisting....", postId);
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.unlisted = !post.unlisted;
    const unlisted = post.unlisted
    await post.save();
    return res.status(200).json({ message: "Post updated successfully" ,unlisted});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
