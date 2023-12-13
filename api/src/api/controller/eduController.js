const Education = require('../model/eduModel'); 
const { newFilePaths, deleteFiles } = require("../helpers/filehamdler");
const fs = require('fs');

// Create Education
const addEdu = async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        if (req.file) newEducation.image = newFilePaths(req.file);
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add education', message: error.message });
    }
};

// Controller function to get a single user experience by editors id
const getEdu = async (req, res) => {
    try {
        const education = await Education.find({ editor: req.params.id });
        if (!education || education.length === 0) {
            return res.status(404).json({ message: 'Experiences not found for the provided User' });
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve experiences', message: error.message });
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

// Delete Experience
const deleteExp = async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
        if (!deletedExperience) {
            return res.status(404).json({ message: 'Experience not found with the provided ID' });
        }
        res.status(200).json({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete experience', message: error.message });
    }
};

// Delete Education
const deleteEdu = async (req, res) => {
    try {
        const deletedEducation = await Education.findByIdAndDelete(req.params.id);
        if (!deletedEducation) {
            return res.status(404).json({ message: 'Education not found with the provided ID' });
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
