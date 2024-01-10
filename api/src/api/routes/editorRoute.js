const {
    getJobsByEditor,
    deleteJobByEditorAndId
} = require("../controller/myJobsController");
const authMiddleware = require("../middlewares/auth")
const router = require("express").Router();

router.get('/:userId', getJobsByEditor);

router.delete('/:userId/:jobId', deleteJobByEditorAndId);

module.exports = router;