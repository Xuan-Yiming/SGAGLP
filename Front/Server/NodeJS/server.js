var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// public page
app.use('/public', express.static('public'));

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// login page
app.get('/login', function(req, res) {
  res.render('pages/login');
});

// planificacion page
app.get('/planificacion', function(req, res) {
  res.render('pages/planificacion');
});

// pedido page
app.get('/pedidos', function(req, res) {
  res.render('pages/pedidos');
});

// flota page
app.get('/flotas', function(req, res) {
  res.render('pages/flotas');
});

// simulacion page
app.get('/simulacion', function(req, res) {
  res.render('pages/simulacion');
});

// error handling
app.use(function(req, res, next) {
  res.status(404).render('pages/error');
});

app.listen(8080);
console.log('Server is listening on port 8080');