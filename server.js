<<<<<<< HEAD
=======
require('./server/config');
>>>>>>> 1c18c48ae9dc04138b2210994a583a28954fba45
const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/helpers');
<<<<<<< HEAD

const port = process.env.PORT || 3000;
=======
const bodyParser = require('body-parser'); 

// parse application/x-www-form-urlencoded ,para tipo POST
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
>>>>>>> 1c18c48ae9dc04138b2210994a583a28954fba45

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

<<<<<<< HEAD
=======
/* =====================================*/
/* Servicio api rest */
/* =====================================*/

// get = obntengo todos los proyectos
app.get('/projects', (req, res) => {
  res.json('hola');
});

// post= creo nuevos proyectos
app.post('/projects', (req, res) => {
  //el body lo trabaja es body-parser, asi obtengo todo lo que venga en el post urlencoded
  let body = req.body;

  if(body.name === undefined){
    //status de peticiones http
    res.status(400).json({
      ok: false,
      message: 'name of project is undefined'
    });
  }else if(body.desc === undefined){
    res.status(400).json({
      ok: false,
      message: 'description of project is undefined'
    });
  }else{
    res.status(201).json({
      project: body,
      estado: 'update'
    });
  }

});

// put = actualizo info de el proyecto con id
app.put('/projects/:id', (req, res) => {
  //obtengo el id del que viene por url
  let id = req.params.id;
  res.json({
    id,
    estado: 'ok'
  });
});

// delete = desctivo el proyecto
app.delete('/projects', (req, res) => {
  res.json('delete');
});


>>>>>>> 1c18c48ae9dc04138b2210994a583a28954fba45
app.get("*", (req, res) => {
  res.render('404');
});

<<<<<<< HEAD
app.listen(port, () => {
  console.log(`Ready on port ${ port }`);
=======
app.listen(process.env.PORT, () => {
  console.log(`Ready on port ${ process.env.PORT }`);
>>>>>>> 1c18c48ae9dc04138b2210994a583a28954fba45
}); 