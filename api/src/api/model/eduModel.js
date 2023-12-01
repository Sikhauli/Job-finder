const mongoose = require('mongoose');
const User = require('../model/user')

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
    },
    institution: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    editor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
