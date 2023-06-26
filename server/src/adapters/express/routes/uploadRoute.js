import express from 'express';
import multer from 'multer';
import { postUpload } from '../controllers/postControllers.js';
import upload from "../../../infrastructure/config/multer.js" 
import { reportPostUpload } from '../controllers/userControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';


const router = express.Router()

router.post("/" ,upload.single("image"),postUpload)
router.post("/PostReport",reportPostUpload)

export default router

