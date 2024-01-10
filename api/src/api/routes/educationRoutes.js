const {
    addEdu,
    getEdu,
    updateEdu,
    deleteEdu,
    getEduId
} = require("../controller/eduController");

const { FILE_STORAGE_PATH } = require("../helpers/constants");
const authMiddleware = require("../middlewares/auth")
const uploadFiles = require("../middlewares/upload");

const router = require("express").Router();

router.post(
    "/",
    uploadFiles(FILE_STORAGE_PATH.educationImage).single("image"),
    addEdu
);

router.get('/:id', getEdu)

router.patch('/:id', updateEdu);

router.delete('/:id', deleteEdu);

module.exports = router;
