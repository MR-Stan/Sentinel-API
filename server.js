// Used to hide keys
require("dotenv").config();

// Used to create server
const express = require("express");

// Enables cross origin resource sharing
const cors = require('cors');

// Used to parse HTTP request cookies
const cookieParser = require('cookie-parser');

// Database models
const db = require("./models/index");

// const keys = require("./keys");

const mysql = require('mysql2');

// Initializing the server
const app = express();

// Setting the server port - must be different then what's used on the front end
const PORT = process.env.PORT || 5000;


// Routes
require("./routes/db_routes/GroupRoutes")(app);
require("./routes/db_routes/UserRoutes")(app);
require('./routes/authenticationRoutes')(app);


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

var connection;
var syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}
else if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}

// starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT
        );
    });
});

module.exports = app;