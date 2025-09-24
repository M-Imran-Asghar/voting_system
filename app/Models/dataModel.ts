import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema({
    personOne: {
        type: String,
        required: [true, "Please Enter Name of Person 1"]
    },
    personTwo: {
        type: String,
        required: [true, "Please Enter Name of Person 2"]
    },
    imageOne: {
        type: String,
        required: [true, "Please Upload Image 1"]
    },
    imageTwo: {
        type: String,
        required: [true, "Please Upload Image 2"]
    },
    startTime: {
        type: Date,
        required: [true, "Please Enter Start Time"]
    },
    endTime: {
        type: Date,
        required: [true, "Please Enter End Time"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to your User model
        required: true
    }
}, {
    timestamps: true
});

// Validation to ensure endTime is after startTime
dataSchema.pre('save', function(next) {
    if (this.endTime <= this.startTime) {
        next(new Error('End time must be after start time'));
    } else {
        next();
    }
});

export const DataModel = mongoose.models.Data || mongoose.model("Data", dataSchema);