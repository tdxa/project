const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// main page
router.get("/", (req, res) => res.render("welcome"));

// dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', { user: req.user.name }));

router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", {
    user: req.user.name,
    email: req.user.email,
    date: req.user.date,
  });
});

module.exports = router;
