const {
    addTag,
    getTag,
    updateTag,
    deleteTag
} = require("../controller/authController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router();

router.post('/', addTag);

router.get('/:id', getTag)

router.patch('/', updateTag);

router.delete('/:id', deleteTag);

module.exports = router;
