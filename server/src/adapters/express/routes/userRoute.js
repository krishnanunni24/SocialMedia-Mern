import express from "express";
import {
  deletePost,
  fetchFollowing,
  followUser,
  likePost,
  savePost,
  unFollowUser,
} from "../controllers/userControllers.js";
import { fetchLikedPosts, fetchPosts, fetchSavedPosts, fetchUserPosts } from "../controllers/postControllers.js";

const router = express.Router();

router.get("/:id/following", fetchFollowing);
router.put("/:userId/follow/:id", followUser);
router.put("/:userId/unfollow/:id", unFollowUser);
router.get("/:userId/posts/:page", fetchPosts);
router.get("/:userId/userPosts",fetchUserPosts)
router.get("/:userId/saved",fetchSavedPosts);
router.delete("/:userId/:postId/delete", deletePost);
router.post("/saved", savePost);
router.post("/liked",likePost)
router.get("/:userId/LikedPosts",fetchLikedPosts)

export default router;
