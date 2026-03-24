import { User } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExits = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (userExits) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds required",
      });
    }
    //check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    //generate access JWT token
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    // generate refresh token
    const refreshtoken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    user.refreshToken = refreshtoken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //send response;
    res.status(200).json({
      success: true,
      message: "Login successfully",
      accessToken,
      refreshtoken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logoutController = async (req,res)=>{
  try {
    //find refersh token from body and cookie
    const refreshToken = req.body?.refreshToken || req.cookie?.refreshToken;

    //if not refreshtoken
    if(!refreshToken){
      return res.status(400).json({
        success:false,
        message:"Unauthorized request"
      })
    }

    //find user from database and remove refresh token from the db
    await User.updateOne(
      {
        refreshToken
      },
      {$unset:{refreshToken:""}}
    );


    //logout
    return res.status(200)
    .clearCookie("refreshtoken")
    .josn({
      success:false,
      message:"Logout successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Logout failed"
    })
  }
}

export const refreshToken = async (req,res)=>{
  try {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken
    
    if(!incomingRefreshToken){
      return res.status(400).json({
        success:false,
        message:"Refresh token not found"
      })
    }
    //vrify refresh token 
    const decodeedtoken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN
    );

    const user = await User.findById(decodeedtoken._id);

    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid refresh token"
      })
    }

    //generte new access token
    const newAccessToken = user. jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
      return res.status(200).json({
        success:true,
        accessToken:newAccessToken
      })
   
  } catch (error) {
     return res.status(200).json({
      success:false,
      message:"Invalid or expired refresh token"
    })
  }
}

export const getMe = async (req,res)=>{
  try {
    const user = await User.findById(req.userId).select("-password");

    if(!user){
      return res.status(404).josn({
        success:false,
        message:"User not found"
      })
    };
    res.status(200).josn({
      success:true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

export const UpdateProfile = async (req,res)=>{
  try {
    const userId = req.user.id //from the middleware

    const { name ,email ,password} = req.body;

    //check if user exists
    const user = await findById(userId);
    if(!user){
      return res.status(404).josn({
        success:false,
        message:"user not found"
      })
    }

    //update filed

    if(name) user.name =name;
    if(email) user.email =email;

    //password update 
    if(password){
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.default.hash(password,10)
      user.password = hashedPassword
    }

    //save updated user
    await user.save();

    //remove sensitive data
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      success:true,
      message:"Profile updated successfully",
      user:updatedUser
    })
  } catch (error) {
    res.status(500).josn({
      success:false,
      message:"Internal server error"
    })
  }
}