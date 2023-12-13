const mongoose = require('mongoose');
const User =require('../model/user')

const experienceSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    editor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
