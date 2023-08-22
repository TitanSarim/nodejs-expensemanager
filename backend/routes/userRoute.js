const express = require("express");
const {register, login, logOut} = require('../controller/userController');
const {isAuthenticatedUser} = require('../middleware/auth')


const router = express.Router();



router.route("/userRegister").post(register);

router.route('/login').post(login, isAuthenticatedUser)


router.route("/logout").get(logOut);



module.exports = router;