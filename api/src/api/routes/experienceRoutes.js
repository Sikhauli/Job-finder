const {
addExp,
getExp,
updateExp,
deleteExp
} = require("../controller/authController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router();

router.post('/', addExp);

router.get('/:id', getExp)

router.patch('/', updateExp);

router.delete('/:id', deleteExp);

module.exports = router;
