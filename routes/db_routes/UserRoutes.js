const db = require("../../models/index");

// npm jsonwebtoken - JSON Web Tokens for authentication
const jwt = require('jsonwebtoken');

// // npm bcryptjs - password encryption
const bcrypt = require('bcryptjs');

module.exports = function (app) {

    // login route
    app.post('/login/submit', (req, res) => {
        res.redirect('/login/' + req.body.email.trim() + '/' + req.body.pass.trim())
    });

    app.get('/login/:email/:pass', (req, res) => {
        db.Sen_User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                res.send('Email not found');
            }
            else {
                bcrypt.compare(req.params.pass, dbUser.pass, (err, response) => {
                    if (response) {
                        jwt.sign({
                            id: dbUser.id,
                            email: dbUser.email
                        }, 'secretkey', (err, token) => {
                            res.send({ token: token });
                        });
                    }
                    else {
                        res.send('Password does not match');
                    }
                });
            }
        });
    });

    // this route creates a new user //
    app.post("/api/user", function (req, res) {
        const textPassword = req.body.pass.trim();
        // salt round = cost factor i.e. how much time is needed to calculate a single bcrypt hash
        // increasing the cost factor by 1 doubles the necessary time
        // more time means harder to brute force crack the password
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(textPassword, salt, function (err, hash) {
                if (err) throw err;
                db.Sen_User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    pass: hash
                })
                    .then(function (dbUser) {
                        res.json(dbUser);
                    });
            });
        });
    });

    // this is the route to delete a user //
    app.delete("/api/user/:id", function (req, res) {
        db.Sen_User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // this route updates the user //
    app.put("/api/user", function (req, res) {
        db.Sen_User.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.put("/api/user/group", function (req, res) {
        db.Sen_User.update(req.body, {
            where: {
                email: req.body.email
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // this route finds all users with the same group id //
    app.get("/api/user/group/:GroupId", function (req, res) {
        db.Sen_User.findAll({
            where: {
                GroupId: req.params.GroupId
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/user/:email", function (req, res) {

        db.Sen_User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function (user) {
            res.json(user);
        });
    });


};