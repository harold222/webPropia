require('./server/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const hbs = require('hbs');
require('./hbs/helpers');

// parse application/x-www-form-urlencoded ,para tipo POST
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }))

// Importacion de rutas apirest
app.use(require('./server/routes/user'));
app.use(require('./server/routes/project'));

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

// Using HBS
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.engine('html', require('hbs').__express);

app.get("/", (req, res) => {
  res.render("index", {
    anio: new Date().getFullYear(),
  });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

app.get("*", (req, res) => {
  res.render("404");
});

mongoose.connect(process.env.URLDB,
  {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true}, (err, res) => {

  if(err) throw err;

  console.log('Connect database');

});

app.listen(process.env.PORT, () => {
  console.log(`Ready on port ${ process.env.PORT }`);
}); 