const Job = require('../model/job')

// Get jobs by editor
const getJobsByEditor = async (req, res) => {
    console.log(req)
    try {
        const jobs = await Job.find({ editor: req?.params?.editor });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs by editor:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Delete a job by its ID for a specific editor
const deleteJobByEditorAndId = async (req, res) => {
    try {
        const editorId = req.params.userId;
        const jobId = req.params.jobId;
        const deletedJob = await Job.findOneAndDelete({ editor: editorId, _id: jobId });
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found for the specified editor and ID.' });
        }
        res.status(200).json({ message: 'Job deleted successfully.', deletedJob });
    } catch (error) {
        console.error('Error deleting job by editor and ID:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = {
    getJobsByEditor,
    deleteJobByEditorAndId
};
