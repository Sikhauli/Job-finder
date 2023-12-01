const mongoose = require('mongoose');

const selectedJobSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    selectionCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('SelectedJob', selectedJobSchema);
