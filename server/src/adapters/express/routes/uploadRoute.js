import express from 'express';
import { postComment, postUpload } from '../controllers/postControllers.js';
import upload from "../../../config/multer.js" 
import { reportPostUpload } from '../controllers/userControllers.js';


const router = express.Router()

router.post("/" ,upload.single("image"),postUpload)
router.post("/PostReport",reportPostUpload)
router.post("/comment",postComment)

export default router

