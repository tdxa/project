const express = require("express");
const fs = require("fs");
const Post = require("../models/Post.js");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("all posts");
});

router.get("/create", (req, res) => {
  res.send("create post form");
});

router.post("/create", async (req, res) => {
  res.send("create post");
});

router.get("/:postId", async (req, res) => {
  res.send("post with id");
});

router.delete("/:postId", async (req, res) => {
  res.send("delete post with id");
});

router.put("/:postId", async (req, res) => {
  res.send("modify post with id");
});

router.get("/:userId", async (req, res) => {
  res.send("user posts");
});

module.exports = router;
