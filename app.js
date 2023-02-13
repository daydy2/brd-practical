const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMid");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const app = express();


app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require("./route/shop"))

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
