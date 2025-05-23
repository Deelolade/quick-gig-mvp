import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        trim: true,
        // required: false,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1740565162~exp=1740568762~hmac=15f5ba27d4bb8e65002b394a1805372a7b817436c37237da7d6e1e8bbdd557c5&w=740",
    },
    bio:{
        type: String,
        maxlength: 300
    },
    skills:[
        {type: String}
    ],
    location:{
        type: String
    },
    role:{
        required: true,
        type: String,
        enum:["freelancer", "client","admin"],
    },
    socialLinks: {
        twitter: { type: String },
        linkedin: { type: String },
        portfolio: { type: String }, 
    },
    balance: { 
        type: Number, 
        default: 0
    }, // Wallet balance
    paymentMethod: { 
        type: String, 
        enum: ["PayPal", "Bank Transfer", "Crypto", "None"], 
        default: "None" 
    },
    rating: { 
        type: Number, 
        default: 0 
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Corrected ref structure
            comment: { type: String, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 }, // Optional validation
            createdAt: { type: Date, default: Date.now },
        }
    ],
    isVerified: { 
        type: Boolean, 
        default: false 
    }, // Email verification
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    resetPasswordToken: { 
        type: String 
    },
    resetPasswordExpires: { 
        type: Date 
    },
    
    },
{timestamps:true}
)
// userSchema.methods.generateVerificationToken = function () {
//     this.verificationToken = crypto.randomBytes(32).toString("hex");
//     this.verificationTokenExpires = Date.now() + 3600000; // Expires in 1 hour
// };

const User = mongoose.model('User', userSchema)
export default User