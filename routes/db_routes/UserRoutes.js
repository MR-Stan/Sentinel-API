const db = require("../../models/index");

// npm jsonwebtoken - JSON Web Tokens for authentication
const jwt = require('jsonwebtoken');

// // npm bcryptjs - password encryption
const bcrypt = require('bcryptjs');

module.exports = function (app) {

    // this route finds one user by email address //
    app.get("/api/user/:email", function (req, res) {
        db.Sen_User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // this route creates a new user //
    app.post("/api/user", function (req, res) {
        const textPassword = req.body.password.trim();
        // salt round = cost factor i.e. how much time is needed to calculate a single bcrypt hash
        // increasing the cost factor by 1 doubles the necessary time
        // more time means harder to brute force crack the password
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(textPassword, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
        db.Sen_User.create(req.body)
            .then(function (dbUser) {
                res.json(dbUser);
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


};