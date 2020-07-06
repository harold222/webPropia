const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Using HBS
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.engine('html', require('hbs').__express);

app.get('/', (req, res) => {
  res.render('index', {
    anio: new Date().getFullYear()
  });
}); 

app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

app.get("*", (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Ready on port ${ port }`);
}); 