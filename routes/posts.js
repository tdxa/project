const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post.js");
const { ensureAuthenticated } = require("../config/auth");

const router = express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find();

    res.render("dashboard", {
      user: req.user.name,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
});

router.post("/user", ensureAuthenticated, async (req, res) => {
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

    const imageUrl = "images\\" + postImage.filename;
    const userId = mongoose.Types.ObjectId(req.session.passport?.user);

    const post = new Post({
      title,
      content,
      imageUrl,
      creator: {
        username: req.user.name,
        userId: userId,
      },
    });

    post.save();

    res.redirect("/dashboard/user");
  } catch (error) {
    errors.push({ msg: "Something went wrong! Please try again" });
    res.render("create-post", {
      errors,
    });
  }
});

// router.get("/:postId", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.postId);
//     res.json({ post: post });
//     // res.render()
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.put("/:postId", async (req, res) => {
//   res.send("modify post with id");
// });

router.get("/user", ensureAuthenticated, async (req, res) => {
  const userId = req.session.passport?.user;

  try {
    const posts = await Post.find({ "creator.userId": userId });

    res.render("user-posts", {
      user: req.user.name,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
});

router.get("/user/:username", ensureAuthenticated, async (req, res) => {
  const username = req.params.username;

  try {
    const posts = await Post.find({ "creator.username": username });

    res.render("users-posts", {
      user: username,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
});

router.post("/delete/:postId", ensureAuthenticated, async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    const userId = req.session.passport?.user;

    if (!post) {
      throw new Error("No post found");
    }

    if (userId.toString() !== post.creator.userId.toString()) {
      throw new Error("Post creator ID does not match");
    }

    post.delete();

    res.redirect("/dashboard/user");
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
});

module.exports = router;
