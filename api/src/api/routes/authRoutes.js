const {
    registerUser,
    loginUser,
    logoutUser,
    logoutAllDevices,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controller/authController");

const authMiddleware = require("../middlewares/auth");

const router = require("express").Router();

// Authentication routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', authMiddleware, logoutUser);
router.post('/logout/all', authMiddleware, logoutAllDevices);

// User CRUD routes
router.get('/', getUsers);      
router.get('/:id', getUser);  
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
