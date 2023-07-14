const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const { auth } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(postController.getPosts)
  .post(auth, postController.addPost);

// Specific posts identified by id
router
  .route("/:id")
  .get(postController.getPostById)
  .put(auth, postController.updatePost)
  .delete(auth, postController.deletePost);

module.exports = router;
