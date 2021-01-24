const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const app = express();

//passport config
require("./config/passport")(passport);

//database config
const db = require("./config/keys").MongooseURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MonoDB connected"))
  .catch((err) => console.log(err));

//ejs
app.use(expressLayout);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({ extended: true }));

//Session - store in env
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Static folders
app.use(express.static(require("path").join(__dirname, "public")));

//Multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + `-` + file.originalname);
  },
});

const allowedMimeTypes = ["image/png", "image/jpg","image/jpeg"];
const fileFilter = (req, file, cb) => {
  const allowedFile = allowedMimeTypes.includes(file.mimetype);
  cb(null, allowedFile);
};


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("postImage")
);

// app.use(multer({ storage: fileStorage }).single("postImage"));

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users.js"));
app.use("/dashboard", require("./routes/posts.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));
