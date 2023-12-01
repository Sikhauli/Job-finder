const Experience = require('../model/expModel');

// Create Experience
const addExp = async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add experience', message: error.message });
    }
};

// Get All Experience
const getExp = async (req, res) => {
    try {
        const allExperience = await Experience.find();
        res.status(200).json(allExperience);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve experience', message: error.message });
    }
};

// Update Experience
const updateExp = async (req, res) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedExperience) {
            return res.status(404).json({ message: 'Experience not found with the provided ID' });
        }
        res.status(200).json(updatedExperience);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update experience', message: error.message });
    }
};

// Delete Experience
const deleteExp = async (req, res) => {
    try {
        const deletedExperience = await Experience.deleteMany({ _id: { $in: req.body.id } });
        if (deletedExperience.deletedCount === 0) {
            return res.status(404).json({ message: 'No experience found with the provided IDs' });
        }
        res.status(200).json({ message: 'Experience deleted', deletedExperienceCount: deletedExperience.deletedCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete experience', message: error.message });
    }
};

module.exports = {
    addExp,
    getExp,
    updateExp,
    deleteExp,
};
