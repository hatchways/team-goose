const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const MatchManager = require('../server/game_manager/MatchManager');

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const matchRouter = require("./routes/matches");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// app.use("/match", matchRouter);
app.post("/match", (req, res) => {
  const hostId = req.body;
  try {
      const matchId = MatchManager.createMatch(hostId);
      res.json(matchId);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});
app.post("/match/:id/join-match", (req, res) => 
{
    const matchId = req.params.id;
    console.log(matchId, "req params")
    try {
        const message = MatchManager.joinMatch(matchId);
        res.json(message);
    } catch (err) {
        console.err(err.message);
        res.status(500).send("Server error");
    }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
