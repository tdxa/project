const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post.js");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.session.passport?.user);

  try {
    const posts = await Post.find();
    res.json({ posts: posts });
    // res.render()
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", async (req, res) => {
  res.render("create-post");
});

router.post("/create", async (req, res) => {
  const { title, content } = req.body;
  const postImage = req.file;
  let errors = [];

  if (title.length === 0) {
    errors.push({ msg: "Please enter the title" });
  }

  if (content.length === 0) {
    errors.push({ msg: "Please enter the caption" });
  }

  try {
    if (!postImage) {
      errors.push({ msg: "Please choose an image" });
    }

    if (errors.length > 0) {
      return res.render("create-post", {
        errors,
      });
    }

    const imageUrl = postImage.path;
    const userId = mongoose.Types.ObjectId(req.session.passport?.user);

    const post = new Post({
      title,
      content,
      imageUrl,
      userId,
    });

    post.save();
  } catch (error) {
    errors.push({ msg: "Something went wrong! Please try again" });
    res.render("create-post", {
      errors,
    });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json({ post: post });
    // res.render()
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(postId);
    const userId = req.session.passport?.user;

    if (!post) {
      throw new Error("No post found");
    }

    if (userId.toString() !== post.userId.toString()) {
      throw new Error("Post creator ID does not match");
    }

    res.json({ posts: posts });
    //res.redirect()
  } catch (error) {
    console.log(error);
  }
});

router.put("/:postId", async (req, res) => {
  res.send("modify post with id");
});

router.get("/user", async (req, res) => {
  const userId = req.session.passport?.user;

  try {
    const posts = await Post.find({ userId: userId });

    // if (!posts) {
    //   throw new Error("No user posts found");
    // }

    res.json({ posts: posts });
    // res.render()
  } catch (error) {
    console.log(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ userId: userId });

    // if (!posts) {
    //   throw new Error("No user posts found");
    // }

    res.json({ posts: posts });
    // res.render()
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
