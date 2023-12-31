const SavedJob = require('../model/SavedJob');
const AppliedJob = require('../model/appliedJob');
const SelectedJob = require('../model/SelectedJob')

// Function to save the selected job's ID
const saveJob = async (req, res) => {
    try {
        const { jobId, userId } = req.body;

        const existingApplication = await AppliedJob.findOne({ jobId, userId });
        const existingJob = await SavedJob.findOne({ jobId, userId });
        if (existingApplication || existingJob) {
            return res.status(400).json({ message: "You have already applied or saved this job" });
        }

        let selectedJob = await SelectedJob.findOne({ jobId });

        if (!selectedJob) {
            selectedJob = new SelectedJob({ jobId });
        }

        selectedJob.selectionCount += 1;
        await selectedJob.save();

        const newApplication = new SavedJob({ jobId, userId });
        await newApplication.save();

        res.json({ message: 'Job saved successfully' });
    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const getSavedJobs = async (req, res) => {
    console.log(req.query.userId)
    try {
        const userId = req.query.userId;
        const savedJobs = await SavedJob.find({ userId }).populate('jobId');
        res.status(200).json(savedJobs);
    } catch (error) {
        console.error('Error fetching saved jobs:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const deleteSavedJob = async (req, res) => {
    try {
        const userId = req.params.userId;
        const jobId = req.params.jobId;
        const deletedJob = await SavedJob.findOneAndDelete({ userId, jobId });

        if (!deletedJob) {
            return res.status(404).json({ message: 'Saved job not found' });
        }

        res.status(200).json({ message: 'Saved job deleted', deletedJob });
    } catch (error) {
        console.error('Error deleting saved job:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const getSavedJobById = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await SavedJob.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job retrieved successfully', job });
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = {
    saveJob,
    getSavedJobs,
    deleteSavedJob,
    getSavedJobById,
};
