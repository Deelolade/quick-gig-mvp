import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import { errorHandler } from "../utils/error.js";

// Send verification email
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // Change to your email
        pass: process.env.EMAIL_PASS, // Change to your email password
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
        const { username, email, password, role } = req.body;
        // vaildate users 
        if (!username || !email || !password || !role || username === "" || email === "" || password === "" || role === "") {
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
            username,
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
        next(errorHandler(400, "All fields are required"))
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            next(errorHandler(400, "user not found]"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorHandler(400, "invalid Password"))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        const { password: pass, ...rest } = validUser._doc
        res.status(200).cookie("access_token", token,
            { httpOnly: true }
        ).json({ message: "Login successful", token, user: rest });
    } catch (err) {
        return next(err)
    }
}