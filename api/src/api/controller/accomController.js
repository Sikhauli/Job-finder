const Accomplishment = require('../model/accompModel');

// Create Accomplishment
const addAccom = async (req, res) => {
    try {
        const newAccomplishment = new Accomplishment(req.body);
        const savedAccomplishment = await newAccomplishment.save();
        res.status(201).json(savedAccomplishment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add accomplishment', message: error.message });
    }
};

// Get All Accomplishments
const getAccom = async (req, res) => {
    try {
        const allAccomplishments = await Accomplishment.find();
        res.status(200).json(allAccomplishments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve accomplishments', message: error.message });
    }
};

// Update Accomplishment
const updateAccom = async (req, res) => {
    try {
        const updatedAccomplishment = await Accomplishment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAccomplishment) {
            return res.status(404).json({ message: 'Accomplishment not found with the provided ID' });
        }
        res.status(200).json(updatedAccomplishment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update accomplishment', message: error.message });
    }
};

// Delete Accomplishment
const deleteAccom = async (req, res) => {
    try {
        const deletedAccomplishment = await Accomplishment.deleteMany({ _id: { $in: req.body.id } });
        if (deletedAccomplishment.deletedCount === 0) {
            return res.status(404).json({ message: 'No accomplishments found with the provided IDs' });
        }
        res.status(200).json({ message: 'Accomplishments deleted', deletedAccomplishmentCount: deletedAccomplishment.deletedCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete accomplishments', message: error.message });
    }
};

module.exports = {
    addAccom,
    getAccom,
    updateAccom,
    deleteAccom,
};
