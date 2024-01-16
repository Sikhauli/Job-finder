const {
    getJobsByEditor,
    deleteJobByEditorAndId
} = require("../controller/editorController");
const authMiddleware = require("../middlewares/auth")
const router = require("express").Router();

router.get('/:editor', getJobsByEditor);

router.delete('/:userId/:jobId', deleteJobByEditorAndId);

module.exports = router;