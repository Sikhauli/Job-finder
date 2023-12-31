const Job = require('../model/job')
const SelectedJob = require('../model/SelectedJob')
const AppliedJob = require('../model/appliedJob');

const postJob = async (req, res) => {
    try {
        const newJob = await new Job(req.body).save();
        res.status(201).json({
            message: "Job posted successfully",
            job: newJob,
        });
    } catch (err) {
        res.status(400).json({
            error: "Unable to post job",
            message: err.message,
        });
    }
};

const getJob = async (req, res) => {
    try {  
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        res.status(200).json({
            message: "Job retrieved successfully",
            job: job,
        });
    } catch (err) {
        res.status(500).json({
            error: "Unable to retrieve job",
            message: err.message,
        });
    }
};

const deleteJobs = async (req, res) => {
    try {
        const deletedJobs = await Job.deleteMany({ _id: { $in: req.body.id } });
        if (deletedJobs.deletedCount === 0) {
            return res.status(404).json({ message: "No jobs found with the provided IDs" });
        }
        res.status(200).json({ message: "Jobs deleted", deletedJobsCount: deletedJobs.deletedCount });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete jobs", message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted", deletedJob });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete job", message: error.message });
    }
};


const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job updated", updatedJob });
    } catch (error) {
        res.status(500).json({ error: "Failed to update job", message: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs", message: error.message });
    }
};


const searchGetJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword; 
        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { location: { $regex: keyword, $options: 'i' } },
                ]
            };
        }
        const jobs = await Job.find(query);

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs", message: error.message });
    }
};



const filterJobs = async (req, res) => {
    try {
        let query = {};
        if (req.query.skills) {
            const skills = req.query.skills.split(',');
            query = {
                skills: { $in: skills } 
            };
        }
        const jobs = await Job.find(query);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs", message: error.message });
    }
};

const selection =async (req, res) => {
    try {
        const jobId = req.body.jobId;

        let selectedJob = await SelectedJob.findOne({ jobId });

        if (!selectedJob) {
            selectedJob = new SelectedJob({ jobId });
        }

        selectedJob.selectionCount += 1;

        await selectedJob.save();

        res.json({ message: 'Selection count updated successfully' });
    } catch (error) {
        console.error('Error updating selection count:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

const getSelection = async (req, res) => {
    try {
        const mostSelectedJobs = await SelectedJob
            .find()
            .populate('jobId') 
            .sort({ selectionCount: -1 }) 
            .limit(10); 

        res.json(mostSelectedJobs);
    } catch (error) {
        console.error('Error fetching most selected jobs:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


const applyJob = async (req, res) => {
    try {
        const { jobId, userId } = req.body;

        const existingApplication = await AppliedJob.findOne({ jobId, userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied to this job" });
        }

        const selectedJob = await SelectedJob.findOne({ jobId });
        if (!selectedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        selectedJob.selectionCount += 1;
        await selectedJob.save();

        const newApplication = new AppliedJob({ jobId, userId });
        await newApplication.save();

        res.json({ message: 'Job applied successfully' });
    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


const suggestSkills = async (req, res) => {
    const query = req.query.query;
    const suggestedSkills = [
        'JavaScript', 'React', 'Node.js', 'Python', 'Security', 'Police', 'Developer', 'SANDF',
        'Piece Job', 'Accountant', 'Finance', 'Art', 'UI/UX Design', 'Frontend Development',
        'Backend Development', 'Java', 'C++', 'Data Analysis', 'Data Science', 'Machine Learning',
        'Artificial Intelligence', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
        'DevOps', 'Full Stack Development', 'Mobile App Development', 'Swift', 'Kotlin', 'Android',
        'iOS', 'Cybersecurity', 'Network Security', 'Penetration Testing', 'Cloud Computing',
        'Blockchain', 'Cryptocurrency', 'Game Development', 'Unity', 'Unreal Engine',
        'Graphic Design', 'Illustration', 'Animation', 'Video Editing', 'Content Writing',
        'Copywriting', 'Social Media Management', 'Digital Marketing', 'SEO', 'SEM',
        'Project Management', 'Agile Methodology', 'Scrum', 'Product Management', 'Sales',
        'Customer Service', 'Data Entry', 'Virtual Assistance', 'Photography', 'Event Planning',
        'Interior Design', 'Architecture', 'Civil Engineering', 'Mechanical Engineering',
        'Electrical Engineering', 'Marketing Analytics', 'Financial Analysis', 'Investment Banking',
        'Human Resources', 'Recruitment', 'Teaching', 'Tutoring', 'Healthcare', 'Nursing',
        'Medicine', 'Dentistry', 'Physical Therapy', 'Legal Writing', 'Legal Research',
        'Translation', 'Localization', 'E-commerce', 'Sales Management', 'Supply Chain Management',
        'Logistics', 'Real Estate', 'Property Management', 'Data Visualization', 'User Research',
        'Event Management', 'Wedding Planning', 'Fashion Design', 'Culinary Arts', 'Nutrition',
        'Personal Training', 'Yoga Instruction', 'Acting', 'Voiceover', 'Music Production',
        'DJing', 'Web Design', 'Network Administration', 'Systems Architecture'
    ];

    res.json(suggestedSkills);
};


// saved Jobs Functions




module.exports = {
    postJob, 
    getJob,
    deleteJob,
    deleteJobs,
    updateJob,
    getJobs,
    searchGetJobs,
    filterJobs,
    suggestSkills,
    selection,
    getSelection,
    applyJob,
    
};
