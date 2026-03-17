import { User } from "../models/auth.model.js";
import bcrypt from "bcrypt";

export const registerController = async(req , res)=>{
    try {
        const {name,email,password} = req.body; 

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const userExits = await User.findOne({
            $or:[
                {email},
                {name}
            ]
        })

        if(userExits){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })



    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

