const {
   getJobs,
   getJob,
   postJob,
   deleteJob,
   deleteJobs,
   updateJob,
   searchGetJobs,
   filterJobs,
   suggestSkills,
   selection,
   getSelection,
   applyJob,
   deleteSelection

} = require("../controller/jobsController");

const  authMiddleware  = require("../middlewares/auth")

const router = require("express").Router();

// Test Links

router.get('/suggest', suggestSkills);

router.post('/selection', selection)

router.get('/selection', getSelection)

router.delete('/selection/:id', deleteSelection);

router.delete("/all", deleteJobs);

router.get("/search", searchGetJobs);

router.get("/filter", filterJobs);

router.post("/", postJob);

router.get("/", getJobs);

router.get("/:id", getJob);

// router.delete("/:id", deleteJob);
router.delete('/delete/:id', deleteJob);

router.patch("/:id", updateJob);

router.post("/apply", applyJob);


module.exports = router;
