// controllers/postController.js
const postModel = require("../models/postModel");

function getAllPosts(req, res) {
  const posts = postModel.getPosts();
  res.json(posts);
}

function createPost(req, res) {
  const { name, discription } = req.body;
  const newPost = { name, discription };
  postModel.addPost(newPost);
  res.status(201).json(newPost);
}

function getPost(req, res) {
  const postId = parseInt(req.params.id);
  const post = postModel.getPostById(postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
}

function updatePost(req, res) {
    const postId = parseInt(req.params.id);
    const updatedPost = req.body;
    const success = postModel.updatePost(postId, updatedPost);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  }

  function deletePost(req, res) {
    const postId = parseInt(req.params.id);
    postModel.deletePost(postId);
    res.json({ success: true });
  }

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
