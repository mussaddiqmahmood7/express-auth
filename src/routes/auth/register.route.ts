import express from "express";
import { RegisterUser } from "../../controller/auth/register.controller.js";
import { VerifyEmail } from "../../controller/auth/verify-email.controller.js";
const router = express.Router()

router.get('/',(_,res)=>{
    res.status(200).json({title:'thanks for hit'})
})
router.post('/register',RegisterUser)
router.post('/verify-email-token',VerifyEmail)

export const userRouter = router