const mongoose = require("mongoose");

const courseReviewSchema = mongoose.Schema(
  {
    courseid: {
      type: String,
      required: [true, "Course ID is required"],
      trim: true,
      maxlength: [10, "Course ID cannot be more than 10 characters"],
    },
    course_title: {
      type: String,
      required: [true, "Course Title is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      trim: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    academic_semester: {
      type: String,
      required: [true, "Academic Semester is required"],
    },
    taught_by: {
      type: String,
      required: [true, "Taught By is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CourseReview", courseReviewSchema);