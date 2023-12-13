const {
addExp,
getExp,
getExpById,
updateExp,
deleteExp
} = require("../controller/expController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router();

router.post('/', addExp);

router.get('/', getExp)

router.get('/:id', getExpById);

router.patch('/id', updateExp);

router.delete('/:id', deleteExp);

module.exports = router;
