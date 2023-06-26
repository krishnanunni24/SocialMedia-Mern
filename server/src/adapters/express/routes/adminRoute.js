import express from 'express';
import { adminLogin} from '../controllers/authControllers.js';
import { blockUser, fetchReportedPosts, getAllUsers,unListPost } from '../controllers/adminUserControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';


const router = express.Router()

router.post("/login",adminLogin)
router.use(verifyToken)
router.get("/getAllUsers",getAllUsers)
router.put("/block",blockUser)
router.get("/reportedPosts",fetchReportedPosts)
router.patch("/:postId/reportAction",unListPost)

export default router