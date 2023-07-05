import express from "express";
import {
  deletePost,
  fetchFollowing,
  fetchUser,
  followUser,
  likePost,
  savePost,
  searchFollowingUsers,
  searchUsers,
  unFollowUser,
  updateUser,
} from "../controllers/userControllers.js";
import { fetchLikedPosts, fetchPosts, fetchSavedPosts, fetchUserPosts } from "../controllers/postControllers.js";
import upload from "../../../infrastructure/config/multer.js";

const router = express.Router();

router.get("/:id/following", fetchFollowing);
router.get("/:userId",fetchUser)
router.get("/:userId/LikedPosts",fetchLikedPosts)
router.get("/:userId/posts/:page", fetchPosts);
router.get("/:userId/userPosts",fetchUserPosts)
router.get("/:userId/saved",fetchSavedPosts);
router.get("/search/:text",searchUsers)
router.get("/:userId/searchFollowing/:text",searchFollowingUsers)



router.put("/:userId/follow/:id", followUser);
router.put("/:userId/unfollow/:id", unFollowUser);
router.put("/:userId/update",upload.single("image"),updateUser)

router.post("/saved", savePost);
router.post("/liked",likePost)

router.delete("/:userId/:postId/delete", deletePost);



export default router;
