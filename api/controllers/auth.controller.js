import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import { errorHandler } from "../utils/error.js";

// Send verification email
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});
const sendVerificationEmail = async (email, token) => {
    const verificationLink = `http://localhost:5500/api/auth/verify/${token}`;

    const emailTemplate = (verificationLink) => {
        return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center;">
      <h2 style="color: #4CAF50;">Welcome to QuickGig! 👋🏽</h2>
      <p style="font-size: 16px; color: #333;">You're almost there! Click the button below to verify your email and start exploring freelance opportunities.</p>
      <a href="${verificationLink}" 
         style="display: inline-block; padding: 12px 20px; margin: 10px 0; font-size: 18px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p style="font-size: 14px; color: #777;">If the button doesn't work, you can also click the link below:</p>
      <p><a href="${verificationLink}" style="word-break: break-all; color: #4CAF50;">${verificationLink}</a></p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #999;">If you didn’t sign up for QuickGig, you can safely ignore this email.</p>
    </div>
  </div>
    `}

    await transporter.sendMail({
        from: `"QuickGig👋🏽👋🏽" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Email",
        text: `Click the link to verify your email: ${verificationLink}`,
        html: emailTemplate(verificationLink),
    });
};
export const signup = async (req, res, next) => {
    try {
        const { fullName,userName, email, password, role } = req.body;
        // vaildate users 
        if (!fullName ||!userName || !email || !password || !role || fullName==="" || userName === "" || email === "" || password === "" || role === "") {
            return next(errorHandler(400, "All fields are required"));
        };

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: true,
                message: "User already exists."
            })
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user with verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            isVerified: false,
            role,
            verificationToken,
        });

        // Save user to database
        await newUser.save();

        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email to log in."
        });
    } catch (err) {
        return next(err)
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid verification token." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "Email already verified." });
        }

        // Mark the user as verified
        user.isVerified = true;
        user.verificationToken = null; // Clear the token after verification
        await user.save();

        res.json({ success: true, message: "Email verified successfully. You can now log in." });
    } catch (error) {
        next(error);
    }
};
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(400, "user not found"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "invalid Password"))
        }
        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        const { password: pass, ...rest } = validUser._doc
        console.log("Generated Token:", token);

        res.status(200).cookie("access_token", token,
            { httpOnly: true }
        ).json({ message: "Login successful", token, user: rest });
    } catch (err) {
        return next(err)
    }
}
export const google = async(req, res, next)=>{
    const {userName,fullName, email, photo, role}=  req.body;

    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id:user._id, isVerified: user.isVerified}, process.env.JWT_SECRET);
            const {password, ...rest }= user._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json(rest)
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,  10)

            const newUser = new User({
                fullName,
                userName,
                email,
                password:hashedPassword,
                role:role,
                profilePicture: photo,
                isVerified:true,
            });
            await newUser.save().catch(error => next(error));
            const token =  jwt.sign({id:newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
            const {password, ...rest}= newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest)
        }
    } catch (error) {
        next(error)
        
    }
}
export const updateUser = async (req, res, next)=>{
    if (!req.params.userId) {
        return res.status(400).json({ message: "User ID is missing in the request URL" });
    }

    // console.log("User ID from token:", req.user.id);
    // console.log("User ID from params:", req.params.userId);
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this user"))
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be atleast five characters"))
        }
        
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.userName) {
        if (req.body.userName.length < 7 || req.body.userName.length > 20) {
            return next(errorHandler(400, "Username must be between 7 to 20  characters"))
        }
        if (req.body.userName.includes(" ")) {
            return next(errorHandler(400, "Username can not contain space"))
        }
        // if (req.body.userName !== req.body.userName.toLowerCase()) {
        //     return next(errorHandler(400, "Username must be lowercase"))
        // }
        if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username can only contain letters and numbers"))
        }
    }
    if(req.body.bio){
        if(req.body.bio.length < 50 || req.body.bio.length > 500){
            return next(errorHandler(400, "Bio description must be between 50 and 500 characters."))
        
        }
    }
    if(req.user.role){
        if (req.user.role === "client" && req.body.skills) {
            delete req.body.skills;
        }
    }
      
    try {
            
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set: {
                userName: req.body.userName,
                fullName: req.body.fullName,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
                bio: req.body.bio,
                skills: req.body.skills,
                location: req.body.location,
                socialLinks: req.body.socialLinks,
                paymentMethod:req.body.paymentMethod
            },
        },{new: true});
        // console.log(updateUser)
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
        
    }
}