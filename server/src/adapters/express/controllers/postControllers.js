import { model } from "mongoose";
import FollowingModel from "../../mongodb/models/followingModel.js";
import PostModel from "../../mongodb/models/postModel.js";
import UserModel from "../../mongodb/models/userModel.js";
import SavedPostsModel from "../../mongodb/models/savedPostsModel.js";
import LikeModel from "../../mongodb/models/likesModel.js";

export const postUpload = async (req, res) => {
  const post = {
    userId: req.body.userId,
    image: req.file.path,
    caption: req.body.caption,
  };
  try {
    let newPost = await PostModel.create(post);

    if (newPost) {
      const User = await UserModel.findOneAndUpdate(
        { _id: newPost.userId },
        { $inc: { posts: 1 } }
      );
      const userCredentials = {
        username: User.username,
        profilePicture: User.profilePicture,
      };
      newPost = newPost.toObject();
      newPost.user = userCredentials;

      return res.status(200).json({ newPost });
    } else {
      return res.status(400).json({ message: "post Error" });
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json(err);
  }
};

export const fetchPosts = async (req, res) => {
  const {userId,page }= req.params;
  const limit =2
  const skip = page*limit
  try {
    const following = await FollowingModel.findOne({ userId }).select(
      "following"
    );

    if (following?.length) {
      const followingUserIds = following.following;

      const postsWithUserDetails = await PostModel.find({
        userId: { $in: followingUserIds },
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "userId",
          select: "username  profilePicture",
          model: UserModel,
        })
        .skip(skip)
       .limit(limit)

        .lean()
        .exec();

      if (postsWithUserDetails.length) {
        postsWithUserDetails.map((post) => {
          const userId = post.userId._id;
          const user = {
            username: post.userId.username,
            profilePicture: post.userId.profilePicture,
          };
          post.userId = userId;
          post.user = user;
        });
        return res.status(200).json({ postsWithUserDetails });
      } else {
        const postsWithUserDetails = await PostModel.find()
        .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .populate({
            path: "userId",
            select: "username profilePicture",
            model: UserModel,
          });

        postsWithUserDetails = postsWithUserDetails.toObject();
        const user = postsWithUserDetails.userId;
        postsWithUserDetails.userId = userId;
        postsWithUserDetails.user = user;
        return res.status(200).json({ postsWithUserDetails });
        // const userIds=response.userId

        // res.status(200).json({randomPosts})
      }
    } else {
      const postsWithUserDetails = await PostModel.find()
      .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({
          path: "userId",
          select: "username profilePicture",
          model: UserModel,
        })
        .lean()
        .exec();
      if (postsWithUserDetails.length) {
        postsWithUserDetails.map((post) => {
          const userId = post.userId._id;
          const user = {
            username: post.userId.username,
            profilePicture: post.userId.profilePicture,
          };
          post.userId = userId;
          post.user = user;
        });
        return res.status(200).json({ postsWithUserDetails });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "catched error", err });
  }
};

export const fetchSavedPosts = async (req, res) => {
  console.log("fetchsaved...");
  try {
    const { userId } = req.params;
    const savedPosts = await SavedPostsModel.findOne({ userId: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "posts",
        populate: {
          path: "userId",
          select: "username profilePicture",
        },
      })
      .lean();
    if (!savedPosts || !savedPosts?.posts.length) {
      return res.status(200).json({ message: "saved Posts empty" });
    }
    const posts = savedPosts.posts;
    return res.status(200).json({ message: "successfully fetched", posts });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "fetching saved posts failed", err });
  }
};

export const fetchUserPosts = async (req, res) => {
  console.log("fetching userPosts....");
  try {
    const { userId } = req.params;
    const userPosts = await PostModel.find({ userId: userId }).sort({
      timestamp: -1,
    });

    if (!userPosts || !userPosts?.length) {
      return res.status(200).json({ message: "User Posts empty", empty: true });
    }
    return res.status(200).json({ message: "successfully fetched", userPosts });
  } catch (err) {
    console.error(err);
    return res.status(500).json("userPost fetching failed", err);
  }
};

export const fetchLikedPosts = async (req, res) => {
  console.log("fetchingLikedPosts...");
  try {
    const { userId } = req.params;
    const likedPosts = await LikeModel.find({ LikedUsers: userId }).distinct(
      "postId"
    );
    return res
      .status(200)
      .json({ message: "successfully fetched", likedPosts });
  } catch (err) {
    console.error("Error fetching liked posts:", err);
  }
};
