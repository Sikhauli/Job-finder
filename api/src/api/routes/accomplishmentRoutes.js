const {
    addAccom,
    getAccom,
    updateAccom,
    deleteAccom
} = require("../controller/authController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router();

router.post('/', addAccom);

router.get('/:id', getAccom)

router.patch('/', updateAccom);

router.delete('/:id', deleteAccom);

module.exports = router;
