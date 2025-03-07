import bcrypt from "bcryptjs";
import User from "../models/user.model.js"

const signup = async (req, res,) => {
    const { fullName, username, email, password, role } = req.body;
    // check if user exists
    if (!fullName || !username || !email || !password || !role || fullName ==="" || username === "" || email === "" || password === "" || role==="") {
        // next(errorHandler(400, "All fields are required"));
        return res.json({ message: "All fields are required" })
    };
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Hashed Password:", hashedPassword);
    // create new user document
    const newUser = new User({
        fullName,username, email, password: hashedPassword,role
    });
    try {
        console.log("Saving User:", req.body);
        await newUser.save();
        res.json({ message: "sign up successfully" })
    } catch (error) {
        // next(errorHandler(500, error));
        console.log(error);
        res.json({ message: "sign up failed" })
    }
}
export default signup;