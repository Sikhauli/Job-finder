const Education = require('../model/eduModel'); 

// Create Education
const addEdu = async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add education', message: error.message });
    }
};

// Get All Education
const getEdu = async (req, res) => {
    try {
        const allEducation = await Education.find();
        res.status(200).json(allEducation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve education', message: error.message });
    }
};

// Update Education
const updateEdu = async (req, res) => {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEducation) {
            return res.status(404).json({ message: 'Education not found with the provided ID' });
        }
        res.status(200).json(updatedEducation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update education', message: error.message });
    }
};

// Delete Education
const deleteEdu = async (req, res) => {
    try {
        const deletedEducation = await Education.deleteMany({ _id: { $in: req.body.id } });
        if (deletedEducation.deletedCount === 0) {
            return res.status(404).json({ message: 'No education found with the provided IDs' });
        }
        res.status(200).json({ message: 'Education deleted', deletedEducationCount: deletedEducation.deletedCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete education', message: error.message });
    }
};

module.exports = {
    addEdu,
    getEdu,
    updateEdu,
    deleteEdu,
};
