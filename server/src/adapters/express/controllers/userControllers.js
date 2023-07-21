import CommentModel from "../../mongodb/models/commentsModel.js";
import FollowingModel from "../../mongodb/models/followingModel.js";
import LikeModel from "../../mongodb/models/likesModel.js";
import PostModel from "../../mongodb/models/postModel.js";
import ReportPostModel from "../../mongodb/models/reportPostModel.js";
import SavedPostsModel from "../../mongodb/models/savedPostsModel.js";
import UserModel from "../../mongodb/models/userModel.js";

export const fetchFollowing = async (req, res) => {
  const userId = req.params.id;

  const user = await FollowingModel.findOne({ userId });
  if (user?.following.length) {
    return res.status(200).json({ user });
  } else {
    return res
      .status(200)
      .json({ message: "no following", followingNill: true });
  }
};

export const followUser = async (req, res) => {
  try {
    console.log("req:", req.params);
    const userId = req.params.userId;
    const followingUserId = req.params.id;

    await FollowingModel.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { following: followingUserId } },
      { upsert: true }
    );

    await FollowingModel.findOneAndUpdate(
      { userId: followingUserId },
      { $addToSet: { followers: userId } },
      { upsert: true }
    );

    await UserModel.findByIdAndUpdate(userId, { $inc: { following: 1 } });
    await UserModel.findByIdAndUpdate(followingUserId, {
      $inc: { followers: 1 },
    });

    return res.status(200).json({
      message: "User followed successfully",
      data: followingUserId,
    });
  } catch (err) {
    console.error("Error following user:", err);
    return res
      .status(500)
      .json({ message: "Failed to follow user", error: err });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const userId = req.params.currentUserId;
    const unfollowUserId = req.params.unFollowingUserId;

    const followingModel = await FollowingModel.findOneAndUpdate(
      { userId: userId },
      { $pull: { following: unfollowUserId } }
    );

    const followingUserFollowingModel = await FollowingModel.findOneAndUpdate(
      { userId: unfollowUserId },
      { $pull: { followers: userId } }
    );

    await UserModel.findByIdAndUpdate(userId, { $inc: { following: -1 } });
    await UserModel.findByIdAndUpdate(unfollowUserId, {
      $inc: { followers: -1 },
    });

    res.status(200).json({
      message: "User unfollowed successfully",
      data: unfollowUserId,
    });
  } catch (err) {
    console.error("Error unfollowing user:", err);
    res.status(500).json({ message: "Failed to unfollow user", error: err });
  }
};

export const reportPostUpload = async (req, res) => {
  try {
    let post = await PostModel.findOne({ _id: req.body.postId }).select(
      "userId"
    );
    const postUserId = post.userId;
    const data = {
      postId: req.body.postId,
      userId: postUserId,
      reporters: [
        {
          userId: req.body.userId,
          reason: req.body.reason,
        },
      ],
    };
    try {
      const reportPost = await ReportPostModel.findOne({ postId: data.postId });
      if (reportPost) {
        const reportExist = reportPost.reporters.some((reporter) =>
          reporter.userId.equals(req.body.userId)
        );
        if (reportExist) {
          return res
            .status(400)
            .json({ message: "Report already exists", alreadyReported: true });
        } else {
          reportPost.reporters.push({
            userId: req.body.userId,
            reason: req.body.reason,
          });
          const updatedReport = await reportPost.save();
          return res
            .status(200)
            .json({ message: "report updated Successfull", updatedReport });
        }
      } else {
        const report = await ReportPostModel.create(data);
        if (report) {
          return res
            .status(200)
            .json({ message: "report created Successfull", report });
        }
      }
    } catch (err) {
      console.error(err, "report error");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to Report", err });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const response = await PostModel.findOneAndDelete({
      _id: postId,
      userId: userId,
    });

    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { posts: -1 } }
      );
    } catch (err) {
      console.error(err);
      return res.status(404).json({ message: "user invalid" });
    }

    return res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    let saved = true;
    let savedPosts = await SavedPostsModel.findOne({ userId: userId });

    if (!savedPosts) {
      savedPosts = new SavedPostsModel({ userId: userId });
      savedPosts.posts.push(postId);
    } else {
      if (savedPosts.posts.includes(postId)) {
        savedPosts.posts = savedPosts.posts.filter(
          (post) => post.toString() !== postId.toString()
        );
        saved = false;
      } else {
        savedPosts.posts.push(postId);
      }
    }

    await savedPosts.save();
    return res.status(200).json({
      message: `Successfully ${saved ? "saved" : "unsaved"} the post`,
      saved,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    let Liked = true;
    let LikedPost = await LikeModel.findOne({ postId: postId });

    if (!LikedPost) {
      LikedPost = new LikeModel({ postId: postId });
      LikedPost.LikedUsers.push(userId);
      try {
        await PostModel.findOneAndUpdate(
          { _id: postId },
          { $inc: { likes: 1 } }
        );
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Post not found in db" });
      }
    } else {
      if (LikedPost.LikedUsers.includes(userId)) {
        LikedPost.LikedUsers = LikedPost.LikedUsers.filter(
          (user) => user.toString() !== userId.toString()
        );
        Liked = false;
        try {
          await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { likes: -1 } }
          );
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Post not found in db" });
        }
      } else {
        LikedPost.LikedUsers.push(userId);
        try {
          await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { likes: 1 } }
          );
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Post not found in db" });
        }
      }
    }

    await LikedPost.save();
    return res.status(200).json({
      message: `Successfully ${Liked ? "saved" : "unsaved"} the post`,
      Liked,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await UserModel.findOne({ _id: userId }).select(
      "-uid -password"
    );
    if (data) {
      return res.status(200).json({ message: "fetched user", data });
    } else {
      return res.status(404).json({ message: "fetch failed, Invalid user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, about, phone } = req.body;
    const image = req.file?.path;
    const updateData = {};

    //check if data is same as the existing userdata
    const User = await UserModel.findOne({ _id: userId });
    if (username !== User.username) updateData.username = username;
    if (about !== User.about) {
      updateData.about = about;
    }
    if (phone !== User.phone) updateData.phone = phone;
    if (image) updateData.profilePicture = image;

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [
        { username: updateData.username },
        { phone: Number(updateData.phone) },
      ],
    }).select("_id username phone");

    if (existingUser) {
      if (existingUser.username === updateData.username) {
        return res
          .status(400)
          .json({ message: "Username already exists", username: true });
      } else if (existingUser.phone === updateData.phone) {
        return res
          .status(400)
          .json({ message: "Phone number already exists", phone: true });
      }
    }

    // Update the user data in the user model using the provided userId

    const userUpdated = await UserModel.findOneAndUpdate(
      { _id: userId },
      updateData,
      {
        new: true,
      }
    );

    if (!userUpdated) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully", userUpdated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const searchText = req.params.text.toLowerCase(); // Convert search text to lowercase

    // Perform search operation based on searchText
    if (searchText) {
      const users = await UserModel.find(
        { username: { $regex: `^${searchText}`, $options: "i" } },
        { username: 1, profilePicture: 1, _id: 1 }
      ).lean();
      if (users.length > 0) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({
          message: "no users found",
        });
      }
    } else {
      res.status(200).json("no text");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchFollowingUsers = async (req, res) => {
  const currentUserID = req.params.userId; // Assuming the current user's ID is available in req.user.id
  const searchText = req.params.text.toLowerCase(); // Convert search text to lowercase

  try {
    // Find the current user's following list
    const following = await FollowingModel.findOne({ userId: currentUserID });

    if (!following) {
      return res.status(404).json({
        message: "Current user's following list not found",
        following: null,
      });
    }

    const followingUserIDs = following.following;

    // Perform the search operation based on searchText and followingUserIDs
    const users = await UserModel.find(
      {
        _id: { $in: followingUserIDs }, // Filter users based on the followingUserIDs
        username: { $regex: `^${searchText}`, $options: "i" }, // Match usernames based on the search text
      },
      { username: 1, profilePicture: 1, _id: 1 }
    ).lean();

    if (users.length > 0) {
      res.status(200).json({ users });
    } else {
      res.status(404).json({
        message: "No users found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserSuggestion = async (req, res) => {
  try {
    const following = await FollowingModel.findOne({
      userId: req.params.userId,
    });
    const followingIds = following ? following.following : [];

    const users = await UserModel.find({ _id: { $nin: followingIds } }).limit(
      4
    );

    if (users.length > 0) {
      return res.status(200).json({ users });
    } else {
      return res.status(400).json({ message: "No users found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchFollowingUsers = async (req, res) => {
  console.log("fetching following users....");
  try {
    const { userId } = req.params;

    const followingModel = await FollowingModel.findOne({
      userId: userId,
    }).populate("following", "profilePicture username");

    if (followingModel) {
      const followingUsers = followingModel.following;
      console.log("following users:", followingUsers);
      res
        .status(200)
        .json({ message: "Fetched following users", data: followingUsers });
    } else {
      res
        .status(404)
        .json({ message: "Following users not found", empty: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchFollowersUsers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followersModel = await FollowingModel.findOne({
      userId: userId,
    }).populate("followers", "profilePicture username");

    if (followersModel) {
      const followersUsers = followersModel.followers;

      res
        .status(200)
        .json({ message: "Fetched followers users", data: followersUsers });
    } else {
      res.status(404).json({ message: "Followers users not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchComments = async (req, res) => {
  console.log("fetching comments...");
  try {
    const { postId } = req.params;
    console.log("postId:", postId);

    // Fetch comments for the specified post, sorted in descending order by createdAt time
    const comments = await CommentModel.find({ postId })
      .sort({
        createdAt: -1,
      })
      .populate("userId", "profilePicture username");

    console.log("comments:", comments);

    res
      .status(200)
      .json({ message: "Fetched comments successfully", data: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch comments", error: err });
  }
};
