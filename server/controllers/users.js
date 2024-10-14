const { User } = require('../models/user');

// Get all users
const getUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ data: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ data: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
