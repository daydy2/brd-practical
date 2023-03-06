const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMid");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./model/user");
require("dotenv").config();

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "titanic gelanious layer",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 5400000 },
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/", require("./route/shop"));

app.use(errorHandler);

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
    app.listen(process.env.PORT);
  }
);
module.exports = app;
