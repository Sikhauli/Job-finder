
const {
    saveJob,
    getSavedJobs,
    getSavedJobById,
    deleteSavedJob,
    searchSavedJobs

} = require("../controller/saveController");

const authMiddleware = require("../middlewares/auth")

const router = require("express").Router();

router.post("/", saveJob);

router.get('/', getSavedJobs);

router.get('/:id', getSavedJobById);

router.delete('/:userId/:jobId', deleteSavedJob);


module.exports = router;