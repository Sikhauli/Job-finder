const mongoose = require("mongoose");
const validator = require("validator");
const Experience = require('../model/expModel')
const Education = require('../model/eduModel')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Please enter your full name."],
            minlength: [5, "Full name must be at least 5 characters long."],
            maxlength: [20, "First name should not be over 20 characters long."],
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: [true, "Email already exists."],
            required: [true, "Please enter your email."],
            validate: [validator.isEmail, "Invalid email."],
        },
        password: {
            type: String,
            required: [true, "Please enter a password."],
            minlength: [6, "Password must be at least 6 characters long."],
        },
        type: {
            type: String,
            trim: true,
            uppercase: true,
            default: "USER",
            enum: {
                values: [ "ADMIN", "USER"],
                message: "{VALUE} is an Invalid user type.",
            },
        },
        status: {
            type: String,
            trim: true,
            uppercase: true,
            default: "ACTIVE",
            enum: {
                values: ["ACTIVE", "BLOCKED"],
                message: "{VALUE} is an Invalid status.",
            },
        },
        avatar: {
            type: String,
        },
        experiences: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Experience", 
            },
        ],
       
        education: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Education",
                },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;