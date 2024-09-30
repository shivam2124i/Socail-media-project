import express from 'express';
import { checkLogin, signin, signup, UpdateNewPassword } from '../controllers/auth.js';
import { findUserByEmail, generateOtp, verifyOtp } from '../controllers/user.js';
const authRouter = express.Router();

authRouter.post("/signin",signin);
authRouter.post("/signup",signup);
authRouter.post("/generateOtp",generateOtp);
authRouter.post("/verifyOtp",verifyOtp);
authRouter.put("/updatePassword/:id",UpdateNewPassword)
authRouter.post("/findUserByEmail",findUserByEmail)
authRouter.post("/checkLogin",checkLogin);



export default authRouter;  