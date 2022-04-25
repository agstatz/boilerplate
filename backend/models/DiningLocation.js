const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
  {
    date: String,
    courseName: String,
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
  },
  { _id: false }
);

const DiningLocationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  xLocation: Number,
  yLocation: Number,
  occupancy: Number,
  hidden: Boolean,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  courseScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course_schedules",
  },
  courses: [coursesSchema],
});


module.exports = mongoose.model("locations", DiningLocationSchema);
