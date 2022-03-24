const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const coursesSchema = Schema({
    date: String,
    courseName: String,
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foods"
        }
    ]
}, { _id: false });

const DiningLocationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    xLocation: Number,
    yLocation: Number,
    occupancy: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    courseSchedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course_schedules"
    },
    courses: [coursesSchema]
});

module.exports = mongoose.model('locations', DiningLocationSchema);