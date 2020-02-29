// database
const db = require('../models/index');

// npm jsonwebtoken - JSON Web Tokens for authentication
const jwt = require('jsonwebtoken');

// // npm bcryptjs - password encryption
const bcrypt = require('bcryptjs');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send('yoooooooo');
    });

    // parsing form data
    app.post('/login/submit', (req, res) => {
        res.redirect('/login/' + req.body.email.trim() + '/' + req.body.pass.trim())
    });

    // user login
    app.get('/login/:username/:password', (req, res) => {
        // check db for username
        db.User.findOne({
            where: {
                username: req.params.email
            }
        }).then(function (user) {
            // if username does not exist
            if (!user) {
                res.send('email not found');
                // res.redirect('/login');
            }
            // if username exists
            else {
                res.send('username found');
                // compare input pw with stored hash pw
                // bcrypt.compare(req.params.password, user.userpw, function (err, response) {
                //     // if passwords match
                //     if (response) {
                //         // sign the json web token
                //         jwt.sign({
                //             id: user.id,
                //             username: user.username
                //         }, 'secretkey', (err, token) => {
                //             res
                //                 // asset created status
                //                 .status(201)
                //                 // create cookie
                //                 .cookie('jwt', token, {
                //                     // cookie expires after 8 hours
                //                     expires: new Date(Date.now() + 8 * 3600000)
                //                 }).redirect('/')
                //         });
                //     }
                //     // if passwords do not match
                //     else {
                // redirect to login modal
                //         res.redirect('/login');
                //     }
                // });
            }
        });
    });

    // create a new user
    app.post('/create/user', (req, res) => {
        // let textPassword = req.body.password.trim();
        // salt round = cost factor i.e. how much time is needed to calculate a single bcrypt hash
        // increasing the cost factor by 1 doubles the necessary time
        // more time means harder to brute force crack the password
        // const saltRounds = 10;
        // bcrypt.genSalt(saltRounds, function (err, salt) {
        //     bcrypt.hash(textPassword, salt, function (err, hash) {
        //         if (err) {
        //             console.log(err);
        //         }
        db.User.create({
            first_name: req.body.first_name.trim(),
            last_name: req.body.last_name.trim(),
            pass: req.body.pass.trim(),
            email: req.body.email.trim(),
        }).then(function (response) {
            res.send('user successfully created')
            // if (response) {
            //     res.redirect('/');
            // }
        });
    });
    //     });
    // });

    // log out and clear cookies
    app.post('/logout', (req, res) => {

        // set cookie to all req.cookies
        cookie = req.cookies;

        // check if cookies have prop attribute
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            // if so, change expiration date to now
            res.cookie(prop, '', { expires: new Date(0) });
        }

        // redirect to login
        res.redirect('/login');

    });
}