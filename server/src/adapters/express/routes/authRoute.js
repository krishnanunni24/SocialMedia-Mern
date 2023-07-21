import express from 'express';
import { registerUser,loginUser, loginWithGoogle, SignUpWithGoogle, otpGenerate, OtpValidate } from '../controllers/authControllers.js';

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post("/google/login",loginWithGoogle)
router.post("/google/signup",SignUpWithGoogle)
router.get("/otpGenerate/:phone",otpGenerate)
router.post("/otp",OtpValidate)



export default router