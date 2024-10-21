import express from 'express'
import ConnectDB from './src/config/mongodb.js'
import {rateLimit} from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import router from './src/routes/api.js'
import "dotenv/config"




const app = express()
ConnectDB()


//middleware 
app.use(express.json())
app.use(cors())


app.use(helmet())
app.use(mongoSanitize())


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100,	
})

app.use(limiter)


//api end points
app.use("/api/v1", router)


//undefined route
// app.use("*", (req, res)=>{
// 	res.status(404).json({success:false, message:"Not Found"})
// })




export default app