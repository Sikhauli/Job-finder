const mongoose = require('mongoose');

const accomplishmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
});

const Accomplishment = mongoose.model('Accomplishment', accomplishmentSchema);

module.exports = Accomplishment;
