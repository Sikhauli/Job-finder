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
   getSelection
} = require("../controller/jobsController");

const  authMiddleware  = require("../middlewares/auth")

const router = require("express").Router();

// Test Links

router.get('/suggest', suggestSkills);

router.post('/selection', selection)

router.get('/selection', getSelection)

router.delete("/all", authMiddleware, deleteJobs);

router.get("/search", searchGetJobs);

router.get("/filter", filterJobs);

router.post("/", postJob);

router.get("/", getJobs);

router.get("/:id", authMiddleware, getJob);

router.delete("/:id", authMiddleware, deleteJob);

router.patch("/:id", authMiddleware, updateJob);


module.exports = router;
