const express = require("express");
const router = express.Router();

// Import user profile controller functions
const {
    getUserProfiles,
    getUserProfileById,
    createUserProfile,
    deleteUserProfile,
    updateUserProfile
} = require('../controllers/userprofileController');

// Define routes for user profiles
router.get("/userprofiles", getUserProfiles); // Get all user profiles
router.get("/userprofiles/:id", getUserProfileById); // Get a user profile by ID
router.post("/createprofile", createUserProfile); // Create a new user profile
router.delete("/userprofiles/:id", deleteUserProfile); // Delete a user profile by ID
router.patch("/userprofiles/:id", updateUserProfile); // Update a user profile by ID

module.exports = router;
