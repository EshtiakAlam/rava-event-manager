const express = require("express");
const router = express.Router();
const { clubLogin, clubSignup } = require('../controllers/clubloginController'); // Note the capitalization

router.post("/login", clubLogin); // Use clubLogin as the route handler
router.post("/signup", clubSignup);
module.exports = router;
