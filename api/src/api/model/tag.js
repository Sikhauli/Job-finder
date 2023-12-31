const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
