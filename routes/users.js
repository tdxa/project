const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

//user model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'))

//Register page
router.get('/register', (req, res) => res.render('register'))

//Register handle
router.post('/register', (req, res) => {
    //console.log(req.body)
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields!' });
    }

    //check passwords
    if (password !== password2) {
        errors.push({ msg: 'Passwords dont match' });
    }

    //check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password is too short! Should be at least 6 characters.' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //validation passed
        //res.send('pass');
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email is already registered!' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash password
                bcrypt.genSalt(10, (error, salt) =>
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error;

                        newUser.password = hash;

                        //Save to database
                        newUser.save()
                            .then(user => {
                                res.redirect('/users/login')
                            }).catch(err => console.log(err))
                    }));
            }
        });
    }
});



module.exports = router;