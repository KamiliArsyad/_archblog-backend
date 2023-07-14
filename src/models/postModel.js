const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    type: String,
    enum: ["Course Review", "Blog", "Project", "Academics"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
  courseReview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseReview",
  },
});

module.exports = mongoose.model("Post", PostSchema);
