const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const user = require("./routes/api/user");
//const match = require("./routes/api/match");

const { json, urlencoded } = express;

const { mongoose } = require("./db/mongoose");
var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", user);
//app.use("/api/match", match);

// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//  next(createError(404));
//});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "../client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

console.log(path.join(__dirname, "../client", "build"));
console.log(path.join(__dirname, "../client", "build", "index.html"));

module.exports = app;
