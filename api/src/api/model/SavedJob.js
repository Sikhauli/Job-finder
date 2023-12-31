const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;
