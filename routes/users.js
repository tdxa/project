const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

//user model
const User = require('../models/User');
const { db } = require('../models/User');

//Login Page
router.get("/login", (req, res) => res.render("login"));

//Register page
router.get("/register", (req, res) => res.render("register"));

//Register handle
router.post("/register", (req, res) => {
  //console.log(req.body)
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields!" });
  }

  //check passwords
  if (password !== password2) {
    errors.push({ msg: "Passwords dont match" });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({
      msg: "Password is too short! Should be at least 6 characters.",
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation passed
    //res.send('pass');
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered!" });
        res.render("register", {
          errors,
          name,
          email,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //Hash password
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;

            newUser.password = hash;

            //Save to database
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered. You can log in! :)"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have been successfully logged out");

  res.redirect("/users/login");
});

router.get('/delete', (req, res) => {
  User.findOneAndDelete(
    {
      _id: mongoose.Types.ObjectId(req.user.id)
    }
  ).then(x => {
    req.flash('success_msg', 'You have successfully deleted your account');
    res.redirect('/');
  })
})


router.get('/change', (req, res) => res.render("change"))

router.post('/change', (req, res) => {
  const { password, password2 } = req.body;
  let errors = [];


  if (password !== password2) {
    errors.push({ msg: "Passwords dont match" });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password is too short! Should be at least 6 characters.",
    });
  }

  if (errors.length > 0) {
    res.render("change");
  } else {
    bcrypt.genSalt(10, (error, salt) =>
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) throw error;

        let new_pass = hash;

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.user.id),
          { password: new_pass }
        ).then(x => {
          req.flash('success_msg', 'You have successfully change your password');
          res.redirect('/users/login');
        })
      }
    ))
  }
})

module.exports = router;
