const {
    registerUser,
    loginUser,
    logoutUser,
    logoutAllDevices,
} = require("../controller/authController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router(); 

router.post('/login', loginUser);

router.post('/register', registerUser)

router.post('/logout', authMiddleware, logoutUser);

router.post('/logout/all', authMiddleware, logoutAllDevices);

module.exports = router;
