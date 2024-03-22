// routes/about.js

const express = require('express');
const router = express.Router();

// @route   GET api/about
// @desc    Get About Us information
// @access  Public
router.get('/', (req, res) => {
  res.json({ 
    companyName: "Your Company Name",
    about: "Some information about your company...",
    mission: "Mission statement...",
    vision: "Vision statement...",
    // Add more relevant information
  });
});

module.exports = router;
