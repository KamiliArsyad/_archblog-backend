const mongoose = require("mongoose");

const CourseReviewSchema = new mongoose.Schema({
  courseid: {
    type: String,
    maxLength: 10,
    required: true,
  },
  course_title: {
    type: String,
    required: true,
  },
  review_body: {
    type: String,
    required: true,
  },
  academic_semester: {
    type: String,
    required: true,
  },
  taught_by: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CourseReview", CourseReviewSchema);
