var db = require("../../models/index");

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