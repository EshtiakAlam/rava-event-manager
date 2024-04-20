const express = require("express")




//controller function 
const {signupAdmin,loginAdmin} = require('../controllers/adminController')
const router = express.Router() 
// login route
router.post ("/loginadmin",loginAdmin)

// signup
router.post('/signupadmin',signupAdmin)




module.exports = router