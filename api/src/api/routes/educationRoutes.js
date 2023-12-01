const {
    addEdu,
    getEdu,
    updateEdu,
    deleteEdu
} = require("../controller/authController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router();

router.post('/', addEdu);

router.get('/:id', getEdu)

router.patch('/', updateEdu);

router.delete('/:id', deleteEdu);

module.exports = router;
