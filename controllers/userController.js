const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        });

        res.status(201).json({ success: true, message: "User registered successfully", data: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords from the response
        res.status(200).json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get a single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If password is being updated, ensure it's hashed
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        }).select("-password"); // Exclude password field
        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
