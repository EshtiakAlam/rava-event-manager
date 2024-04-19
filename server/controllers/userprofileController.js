const UserProfile = require('../models/userprofileModel');
const mongoose = require('mongoose');

// GET all user profiles
const getUserProfiles = async (req, res) => {
    try {
        const userProfiles = await UserProfile.find({}).sort({ createdAt: 1 });
        res.status(200).json(userProfiles);
    } catch (error) {
        console.error('Error getting user profiles:', error);
        res.status(500).json({ error: 'Could not get user profiles.' });
    }
};

// GET a single user profile by ID
const getUserProfileById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user profile' });
        }

        const userProfile = await UserProfile.findById(id);

        if (!userProfile) {
            return res.status(404).json({ error: 'No such user profile' });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ error: 'Could not get user profile.' });
    }
};

// POST a new user profile
const createUserProfile = async (req, res) => {
    const { name, status, studentId, email, memberStatus, department } = req.body;

    try {
        const userProfile = await UserProfile.create({ name, status, studentId, email, memberStatus, department });
        res.status(201).json(userProfile);
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'Could not create user profile.' });
    }
};

// DELETE a user profile by ID
const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user profile' });
        }

        const userProfile = await UserProfile.findOneAndDelete({ _id: id });

        if (!userProfile) {
            return res.status(404).json({ error: 'No such user profile' });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'Could not delete user profile.' });
    }
};

// PATCH a user profile by ID
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user profile' });
        }

        const userProfile = await UserProfile.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!userProfile) {
            return res.status(404).json({ error: 'No such user profile' });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Could not update user profile.' });
    }
};

module.exports = {
    getUserProfiles,
    getUserProfileById,
    createUserProfile,
    deleteUserProfile,
    updateUserProfile
};
