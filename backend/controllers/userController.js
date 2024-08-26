import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

//login User
const loginUser= async (req, res) => {
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't Exists"});

        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"});

        }
        const token=createToken(user._id);
        res.json({success:true,message:"Logged In Successfully",token});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register User
const registerUser= async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        //check if user already exist
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"})

        }
        //validating email and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"});

        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters long"})

        }
        //hashing the user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        //create new user
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        //save user to database
        const user=await newUser.save();
        //generate token
        const token=createToken(user._id);
        res.json({success:true,token})

    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
} 


export {loginUser, registerUser};