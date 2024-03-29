const User = require("../models/userModels");
const Admin = require("../models/adminModels"); // Import the Admin model
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user;
        // Check if the user exists in the User schema
        user = await User.login(email, password);

        // If the user doesn't exist in the User schema, check if it's an admin
        if (!user) {
            user = await Admin.login(email, password);
        }

        // If user is neither a regular user nor an admin, return an error
        if (!user) {
            throw new Error('User not found');
        }

        // Create a token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup user
const signupUser = async (req, res) => {
    const { email, studentid, password } = req.body;
    try {
        const user = await User.signup(email, studentid, password);

        // Create a token
        const token = createToken(user._id);
        res.status(200).json({ email, studentid, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };
