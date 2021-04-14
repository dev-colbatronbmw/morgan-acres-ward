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
  host: "us-cdbr-east-03.cleardb.com", // us-cdbr-east-03.cleardb.com
  user: "b54de4b813b0d2", //b54de4b813b0d2
  password: "e33f4fcc", //e33f4fcc
  database: "heroku_3b6ba14cc34f6dd" //heroku_3b6ba14cc34f6dd
});

function getConnection() {
  return pool;
}
app.get("/api/sections", cors(), (req, res) => {
  let sections = [];
  let sectionContent = [];
  getConnection().query("SELECT * FROM sections", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for products: " + err);
      res.sendStatus(500);
      res.end();
      return;
    }

    //code modification
    sections = rows.map(row => {
      return {
        id: row.id,
        name: row.name
      };
    });

    console.log(sections);
    res.json(sections);
  });
});

app.get("/api/section-content", cors(), (req, res) => {
  getConnection().query(
    "SELECT * FROM section_content",
    [],
    (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for products: " + err);
        res.sendStatus(500);
        res.end();
        return;
      }

      const sectionContent = rows.map(row => {
        return {
          id: row.rowId,
          sectionId: row.sectionId,
          link: row.linkRoute,
          linkContent: row.linkContent,
          bold: row.bold,
          p: row.p
        };
      });

      res.json(sectionContent);
    }
  );
});

const port = 5000;

// app.listen(port, () => `Server running on port ${port}`);
app.listen(port, () => {
  debug(`Listening on port ${chalk.blueBright(port)}`);
});
