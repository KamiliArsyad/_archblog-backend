const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

// Specific posts identified by id
router
  .route("/:id")
  .get(postController.getPostById)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
