// models/post.js
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/posts.json");

function getPosts() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

function addPost(newPost) {
  const posts = getPosts();
  newPost.id = generateUniqueId(posts);
  posts.push(newPost);
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
}
function generateUniqueId(posts) {
  // Generate a unique id starting from 1 and incrementing by 1
  const existingIds = posts.map((post) => post.id);
  const newId = existingIds.length > 0 ? existingIds.length + 1 : 1;
  return newId;
}

function getPostById(postId) {
  const posts = getPosts();
  return posts.find((post) => post.id === postId);
}

function updatePost(postId, updatedPost) {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedPost };
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
    return true;
  }
  return false;
}

function deletePost(postId) {
  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.id !== postId);
  fs.writeFileSync(dataFilePath, JSON.stringify(filteredPosts, null, 2));
}

module.exports = {
  getPosts,
  addPost,
  getPostById,
  updatePost,
  deletePost,
};
