if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var express = require("express");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("express-flash");

const initializePassport = require("./passport");

initializePassport(
  passport,
  (username) => users.find((user) => user.username === username),
  (id) => users.find((user) => user.id === id)
);

const users = [];

async function createUser() {
  try {
    var hashedPassword = await bcrypt.hash("adm", 10);
    users.push({
      id: 1,
      username: "adm",
      password: hashedPassword,
    });
  } catch (e) {
    console.log(e);
  }
}

createUser();

var app = express();
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", checkAuthenticated, function (req, res) {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  var tagline =
    "No programming concept is complete without a cute animal mascot.";

  res.render("pages/index", {
    mascots: mascots,
    tagline: tagline,
  });
});

// public page
app.use("/public", express.static("public"));

// about page
app.get("/about", checkAuthenticated, function (req, res) {
  res.render("pages/about");
});

// login page
app.get("/login", CheckNotAuthenticated, function (req, res) {
  res.render("pages/login");
});

app.post(
  "/login",
  CheckNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/planificacion",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// app.post('/login', function(req, res) {
//   const username = req.query.username;
//   const password = req.query.password;

//   // You can now use the username and password for authentication
//   if (username === "admin" && password === "admin") {
//     res.render('pages/planificacion');
//   }
//   res.render('pages/login');
// });

// planificacion page
app.get("/planificacion", checkAuthenticated, function (req, res) {
  res.render("pages/planificacion");
});

// pedido page
app.get("/pedidos", checkAuthenticated, function (req, res) {
  res.render("pages/pedidos");
});

// flota page
app.get("/flotas", checkAuthenticated, function (req, res) {
  res.render("pages/flotas");
});

// simulacion page
app.get("/simulacion", checkAuthenticated, function (req, res) {
  res.render("pages/simulacion");
});

// error handling
app.use(function (req, res, next) {
  res.status(404).render("pages/error");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function CheckNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/planificacion");
  }
  next();
}

app.listen(8080);
console.log("Server is listening on port 8080");
