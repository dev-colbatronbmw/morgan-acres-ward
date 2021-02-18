const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("dotenv/config");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const csrfMiddleware = csurf({
  cookie: true
});

const initializePassport = require("./passport-config");
initializePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(csrfMiddleware);

app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: process.env.SECRET_TUNNLE,
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 3)
  })
);

// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER_DATA,
//   password: process.env.DATABASE_ACCESS,
//   database: process.env.DATABASE
// });

// function getConnection() {
//   return pool;
// }

const pool = mysql.createPool({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b08f2140990b49",
  password: "fa587cc0",
  database: "heroku_9f57e5ddb449e39"
});

function getConnection() {
  return pool;
}
app.get("/api/bulletin", cors(), (req, res) => {
  const connection = getConnection();

  const qString = "SELECT * FROM api";
  connection.query(qString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for products: " + err);
      res.sendStatus(500);
      res.end();
      return;
    }
    // console.log("success?");
    console.log(rows);

    //code modification
    const products = rows.map(row => {
      return {
        prodId: row.prodId,
        prodName: row.prodName,
        prodDesc: row.prodDesc,
        prodPrice: row.prodPrice,
        prodRating: row.prodRating,
        prodCreatedDate: row.prodCreatedDate,
        prodModifiedDate: row.prodModifiedDate
      };
    });

    res.json(products);
  });
});

const port = 5000;

// app.listen(port, () => `Server running on port ${port}`);
app.listen(port, () => {
  debug(`Listening on port ${chalk.blueBright(port)}`);
});
