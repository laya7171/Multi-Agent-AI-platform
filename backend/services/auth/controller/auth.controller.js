import { getAuth } from "firebase-admin/auth";
import app from "../config/firebase.js";
import User from "../models/user_model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
    try{
        const {token} = req.body
        const decoded = await getAuth(app).verifyIdToken(token)
        let user = await User.findOne({
            firebaseUId: decoded.uid
        })
        if (!user){
            user = await User.create({
                firebaseUId: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            })
        }
        const sessionId = crypto.randomUUID()
        await redis.set(`session-$${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }), "EX", 7*24*60*60) // 7 days 
        
        res.cookie("session", sessionId,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)
    }
    catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({message: "Login failed"});
    }
}
export const logOut = async (req, res) => {
    try{
        const sessionId = req.cookies.session
        await redis.del(`session-$${sessionId}`)
        res.clearCookie("session")
        return res.status(200).json({message: "logout successfull"})
    }
    catch(error){
        console.error('Error during logout:', error);
        return res.status(500).json({message: "Logout failed"});
    }
} 