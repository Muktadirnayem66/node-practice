import profileModel from "../models/profileModel.js"
import jwt from 'jsonwebtoken'


const createProfile = async (req, res)=>{
    
    try {
        const reqBody = req.body
        const {email} = req.body
        const existUser = await profileModel.findOne({email})
        if(existUser){
            res.status(400).json({success:false, message:"user already exists"})
        }

        const newUser = new profileModel(reqBody)
        await newUser.save()
        res.status(201).json({success:true, message:newUser})
        
    } catch (err) {
        res.status(400).json({success:false,message:"Profile creation failed"})
    }

}

const userLogin = async (req, res)=>{
    try {
        const username = req.body["userName"]
        const password = req.body["password"]
        const user = await profileModel.findOne({userName:username})
        if(!user){
            res.status(204).json({success:false, message:"user not found"})
        }else{
            const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 *60 * 60),user:user}, process.env.JSON_SECRET_KEY)
            res.status(201).json({success:true, token:token})
        }

    } catch (err) {
        console.log(err);
        res.status(404).json({success:false,message:"Unauthorize credentials"})
    }
}

 const selectProfile = async(req, res)=>{
    try {
           
        const userName = req.headers.userName
        const user = await profileModel.find({userName}).lean()
        if(user){
            res.status(200).json({success:true, user:user})  
        }else{
            res.status(401).json({success:false, message:"user not found"})  
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
}


const updateProfile = async (req, res)=>{
    try {
        const userName = req.headers.userName
        const reqBody = req.body
        let user = await profileModel.findOne({userName})
        if(!user){
            return res.status(404).json({success:false, messsage:"User not found" })
        }
        
        Object.assign(user, reqBody)
        await user.save()

        res.status(202).json({success:true, message:user})
       
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
}

export { createProfile, userLogin, selectProfile, updateProfile}