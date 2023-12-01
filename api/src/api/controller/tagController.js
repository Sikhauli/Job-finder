const Tag = require('../model/tag'); 

// Create Tag
const addTag = async (req, res) => {
    try {
        const newTag = new Tag(req.body);
        const savedTag = await newTag.save();
        res.status(201).json(savedTag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add tag', message: error.message });
    }
};

// Get All Tags
const getTag = async (req, res) => {
    try {
        const allTags = await Tag.find();
        res.status(200).json(allTags);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tags', message: error.message });
    }
};

// Update Tag
const updateTag = async (req, res) => {
    try {
        const updatedTag = await Tag.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTag) {
            return res.status(404).json({ message: 'Tag not found with the provided ID' });
        }
        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tag', message: error.message });
    }
};

// Delete Tag
const deleteTag = async (req, res) => {
    try {
        const deletedTag = await Tag.deleteMany({ _id: { $in: req.body.id } });
        if (deletedTag.deletedCount === 0) {
            return res.status(404).json({ message: 'No tags found with the provided IDs' });
        }
        res.status(200).json({ message: 'Tags deleted', deletedTagCount: deletedTag.deletedCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tags', message: error.message });
    }
};

module.exports = {
    addTag,
    getTag,
    updateTag,
    deleteTag,
};
