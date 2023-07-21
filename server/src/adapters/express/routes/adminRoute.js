import express from 'express';
import { adminLogin} from '../controllers/authControllers.js';
import { blockUser, fetchLikesDataWithDiffPercentage, fetchNewPostsWeekly, fetchNewUsersWeekly, fetchPostsDataWithDiffPercentage, fetchReportedPosts, fetchReportedPostsDataWithDiffPercentage, fetchTotal, fetchUserDataWithDiffPercentage,getAllUsers,unListPost } from '../controllers/adminUserControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';


const router = express.Router()

router.post("/login",adminLogin)
router.use(verifyToken)

router.get("/fetchUsersStats",fetchUserDataWithDiffPercentage)
router.get("/fetchPostsStats",fetchPostsDataWithDiffPercentage)
router.get("/fetchLikesStats",fetchLikesDataWithDiffPercentage)
router.get("/fetchReportsStats",fetchReportedPostsDataWithDiffPercentage)
router.get("/getUsers",getAllUsers)
router.get("/reportedPosts",fetchReportedPosts)
router.get("/fetchNewUsersWeekly",fetchNewUsersWeekly)
router.get("/fetchNewPostsWeekly",fetchNewPostsWeekly)
router.get("/fetchTotal",fetchTotal)




router.put("/block",blockUser)
router.patch("/:postId/reportAction",unListPost)

export default router