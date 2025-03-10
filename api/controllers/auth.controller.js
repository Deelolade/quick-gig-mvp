import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import crypto from "crypto"
import nodemailer from "nodemailer"
import { errorHandler } from "../utils/error.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (NOT your real password)
    },
});

export const signup = async (req, res, next) => {
    const {  username, email, password } = req.body;
    // vaildate users 
    if ( !username || !email || !password  || username === "" || email === "" || password === "") {
        // next(errorHandler(400, "All fields are required"));
        return res.json({ message: "All fields are required" })
    };
    
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser){
        return res.status(400).json({
            success: true,
            message: "User already exists."
        })
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Hashed Password:", hashedPassword);
    
    const emailToken = crypto.randomBytes(32).toString("hex");

    // create new user document
    const newUser = new User({
        username, 
        email, 
        password: hashedPassword,
        isVerified: false,
        emailToken,
    });
    try {
        console.log("Saving User:", req.body);
        await newUser.save();

        const verifyLink = `http://localhost:5500/api/auth/verify-email/${emailToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
        });
        res.json({ 
            success: true,
            message: "sign up successfully. Check your email for verification. " 
        })


    } catch (error) {
        next(errorHandler(500, error));
        console.log(error);
    }
}

export const verifyEmail = async (req, res, next)=>{
    const { token } = req.params;
    try {
        const user = await User.findOne({emailToken: token});

        if(!user){
            return res.status(400).json({
                sucsess: false,
                message: "Invalid or expired token"
            })
        }
        user.isVerified = true;
        user.emailToken = undefined;
        await user.save()
        
        res.json({
            success: true,
            message:"Email Verified Successfully"
        })
    } catch (error) {
        next(errorHandler(500, "Verification failed "))
    }
} 

export const signIn = async (req, res, next)=>{
    const {email, password}= req.body;
    if (!email || !password || email ==="" || password ===""){
        next(errorHandler(400, "All fields are required"))
    }
    
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            next(errorHandler(400, "user not found]"))
        }
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if (!validPassword){
            next(errorHandler(400, "invalid Password"))
        }
        if (!validUser.isVerified) {
            return next(errorHandler(400, "Please verify your email before logging in"));
        }
        
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest} = validUser._doc
        res.status(200).cookie("access_token", token,
            {httpOnly: true}
        ).json(rest)
    } catch (err) {
        next(err)
    }
}