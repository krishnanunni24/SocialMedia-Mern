import express from "express";
import {
  deletePost,
  fetchCommentReplies,
  fetchComments,
  fetchFollowersUsers,
  fetchFollowing,
  fetchFollowingUsers,
  fetchUser,
  followUser,
  getUserSuggestion,
  likePost,
  savePost,
  searchFollowingUsers,
  searchUsers,
  unFollowUser,
  updateUser,
} from "../controllers/userControllers.js";
import { fetchLikedPosts, fetchPosts, fetchSavedPosts, fetchUserPosts } from "../controllers/postControllers.js";
import upload from "../../../config/multer.js";

const router = express.Router();

router.get("/:id/following", fetchFollowing);
router.get("/suggestion/:userId",getUserSuggestion)
router.get("/:userId",fetchUser)
router.get("/:userId/LikedPosts",fetchLikedPosts)
router.get("/:userId/posts/:page", fetchPosts);
router.get("/:userId/userPosts",fetchUserPosts)
router.get("/:userId/saved",fetchSavedPosts);
router.get("/search/:text",searchUsers)
router.get("/:userId/searchFollowing/:text",searchFollowingUsers)
router.get("/followingUsers/:userId",fetchFollowingUsers)
router.get("/followerUsers/:userId",fetchFollowersUsers)
router.get("/:postId/comments",fetchComments)
router.get("/:commentId/replies",fetchCommentReplies)

router.put("/:userId/follow/:id", followUser);
router.put("/:currentUserId/unfollow/:unFollowingUserId", unFollowUser);
router.put("/:userId/update",upload.single("image"),updateUser)

router.post("/saved", savePost);
router.post("/liked",likePost)

router.delete("/:userId/:postId/delete", deletePost);



export default router;
  