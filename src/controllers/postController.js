const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const CourseReview = require("../models/courseReviewModel");
const User = require("../models/userModel");

// @desc    Add a post
// @route   POST /api/posts
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  const { title, body, author, categories, timestamp, imageURL, courseReview } =
    req.body;

  // Fetch the author from the database
  const authorUser = await User.findById(author);

  // Check if the author is the same as the logged in user
  if (req.user._id.toString() !== authorUser._id.toString()) {
    res.status(401);
    throw new Error("User not authorized to create this post");
  }

  let postTitle = title;
  let postBody = body;
  let postCategories = categories;

  // If a CourseReview is included, set the title, body, and categories based on the CourseReview
  if (courseReview) {
    const courseReviewDoc = await CourseReview.findById(courseReview);
    postTitle = `${courseReviewDoc.course_title}: ${courseReviewDoc.courseid} Review`;
    postBody = courseReviewDoc.review_body;
    postCategories = "Course Review";
  }

  const post = new Post({
    title: postTitle,
    body: postBody,
    author,
    categories: postCategories,
    timestamp,
    imageURL,
    courseReview,
  });

  const createdPost = await post.save();

  res.status(201).json(createdPost);
});

// @desc    Update a post by ID
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, body, author, categories, timestamp, imageURL, courseReview } =
    req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    // Check if the author is the same as the logged in user
    if (req.user._id.toString() !== post.author.toString()) {
      res.status(401);
      throw new Error("User not authorized to update this post");
    }

    post.title = title;
    post.body = body;
    post.author = author;
    post.categories = categories;
    post.timestamp = timestamp;
    post.imageURL = imageURL;
    post.courseReview = courseReview;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Delete a post by ID
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    // Check if the author is the same as the logged in user
    if (req.user._id.toString() !== post.author.toString()) {
      res.status(401);
      throw new Error("User not authorized to delete this post");
    }

    await post.remove();

    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  // Map over the posts to extract the summary
  const postSummaries = posts.map((post) => ({
    title: post.title,
    author: post.author,
    summary: post.body.substring(0, 200), 
    categories: post.categories,
    timestamp: post.timestamp,
    imageURL: post.imageURL,
  }));

  res.json(postSummaries);
});

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

module.exports = {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
