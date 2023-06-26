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
  console.log(req.params.id, "followingUserId");
  console.log(req.params.userId, "UserId");
  try {
    const userId = req.params.userId;
    const followingUserId = req.params.id;

    let followingModel = await FollowingModel.findOne({ userId: userId });

    if (!followingModel) {
      followingModel = new FollowingModel({ userId: userId });
    }

    followingModel.following.push(followingUserId);

    await followingModel.save();
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { following: 1 } }
      );

      await UserModel.findOneAndUpdate(
        { _id: followingUserId },
        { $inc: { followers: 1 } }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "user not found in db" });
    }

    res
      .status(200)
      .json({ message: "User followed successfully", data: followingUserId });
  } catch (err) {
    console.error("Error unfollowing user:", error);
    return res.status(500).json({ message: "Failed to unfollow user", err });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followingUserId = req.params.id;

    // Find the following document for the current user
    let following = await FollowingModel.findOne({ userId });

    if (!following) {
      return res
        .status(404)
        .json({ message: "Following data not found for the user" });
    }

    // Remove the followingUserId from the following array
    following.following = following.following.filter(
      (id) => id !== followingUserId
    );

    // Save the updated following document
    await following.save();

    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { following: -1 } }
      );
      await UserModel.findOneAndUpdate(
        { _id: followingUserId },
        { $inc: { followers: -1 } }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "user not found in db" });
    }

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res
      .status(500)
      .json({ message: "Failed to unfollow user", data: followingUserId });
  }
};

export const reportPostUpload = async (req, res) => {
  console.log("reporting Post....", req.body);
  try {
    let post = await PostModel.findOne({ _id: req.body.postId }).select(
      "userId"
    );
    const postUserId = post.userId;
    console.log(postUserId, "user who posted");
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
          console.log(updatedReport, "updatedReport");
          return res
            .status(200)
            .json({ message: "report updated Successfull", updatedReport });
        }
      } else {
        const report = await ReportPostModel.create(data);
        if (report) {
          console.log(report);
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
  console.log("deletePost");
  try {
    const { userId, postId } = req.params;
    console.log(userId, "userId");
    console.log(postId, "postId");

    const response = await PostModel.findOneAndDelete({
      _id: postId,
      userId: userId,
    });

    try{
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $inc: { posts: -1 } }
    )
    }catch(err){
 console.error(err)
 return res.status(404).json({message:"user invalid"})
    }

    return res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  console.log("savePost");
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
    return res
      .status(200)
      .json({
        message: `Successfully ${saved ? "saved" : "unsaved"} the post`,
        saved,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  console.log("LikePost");
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
    return res
      .status(200)
      .json({
        message: `Successfully ${Liked ? "saved" : "unsaved"} the post`,
        Liked,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
