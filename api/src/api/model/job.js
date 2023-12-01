const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a job title."],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please provide a job description."],
        },
        location: {
            type: String,
            required: [true, "Please provide a job location."],
        },
        salary: {
            type: Number,
            required: [true, "Please provide a job salary."],
        },
        company: {
            type: String,
            required: [true, "Please provide a job salary."],
        },
        period: {
            type: String,
            required: [true, "Please provide a job period."],
            enum: ["Full-time", "Part-time", "Contract", "Temporary"],
        },
        status: {
            type: String,
            required: [true, "Please provide a job period."],
            default: 'Hiring',
            enum: ["Hiring", "Expired"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
