const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET,             // Secret key from environment variables
            { expiresIn: "1h" }                 // Token expiration time
        );

        // Respond with the token and user data (excluding the password)
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ success: true, token, user: userData });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



