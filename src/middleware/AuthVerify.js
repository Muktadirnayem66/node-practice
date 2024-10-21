import jwt from 'jsonwebtoken'


export const authVerify = (req, res, next)=>{
    try {
        const token = req.headers["token-key"]

        if(!token){
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        const verifyUser = jwt.verify(token, process.env.JSON_SECRET_KEY)
           
             
        let userName = verifyUser["user"]["userName"]
        //add username and add it req.header
        req.headers.userName = userName
        req.user = verifyUser

        next()   
    } catch (err) {
        res.status(400).json({success:false,message:"Unauthorized user"})
    }
}