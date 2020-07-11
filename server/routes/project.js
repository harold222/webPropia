/* =====================================*/
/* Servicio api rest */
/* =====================================*/
const express = require("express");
const app = express();
const _ = require('underscore');
const ProyectoSchema = require("../models/projects");

// get = obntengo todos los proyectos
app.get("/", (req, res) => {
  //obtengo todos los registros guardados, si su estado es verdadero
  ProyectoSchema.find({"estado": true}, 'nombreProject imgMain url filtrado').exec((err, userWeb) => {
    if(err){
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.render("index", {
      userWeb,
      anio: 2020
    });
  })
});

// get = obntengo un proyecto por su link o puede ser por id
app.get("/project", (req, res) => {

  //obtengo un proyecto por su id
  let url = req.query.url;
 
  ProyectoSchema.find({"url": url, "estado": true}, 'nombreProject descProject technologies icons dateDevelopment imgComplete link').exec((err, userWeb) => {
    if(err){
      return res.status(400).json({
          ok: false,
          message: 'Se necesita enviar la url del proyecto',
          url,
          err
      });
    }

    let fecha = JSON.parse(userWeb).dateDevelopment;
    res.json({
      fecha
    })

    // .toISOString().substring(0,10);
    // res.render('portfolio', {
    //   userWeb,
    //   fecha
    // });
  })
});

// post= creo nuevos proyectos
app.post("/projects", (req, res) => {
  //el body lo trabaja es body-parser, asi obtengo todo lo que venga en el post urlencoded
  let body = req.body;

  let proyecto = new ProyectoSchema({
    nombreProject: body.name,
    descProject: body.desc,
    technologies: body.tec,
    icons: body.icon,
    dateDevelopment: body.date,
    imgMain: body.imgMain,
    imgComplete: body.imgComp,
    link: body.linkDev,
    url: body.url
  });

  //por defecto
  proyecto.save((error, usuarioDB) =>{
    if(error){
        return res.status(400).json({
            ok: false,
            error
        });
    }

    res.json({
        ok: true,
        usuario: usuarioDB
    });
});
});

// put = actualizo info de el proyecto con id
app.put("/projects/:id", (req, res) => {
  //obtengo el id del que viene por url
  let id = req.params.id;
  let body = _.pick(req.body, [
    'nombreProject',
    'descProject',
    'technologies',
    'icons',
    'dateDevelopment',
    'imgMain',
    'imgComplete',
    'estado',
    'link',
    'url'
    ]
  );

  ProyectoSchema.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (error, usuarioDB) => {

      if(error){
          return res.status(400).json({
              ok: false,
              error
          });
      }

      res.json({
          estado: "ok",
          usuario: usuarioDB
      });
  })
});

// delete = desctivo el proyecto
app.delete("/projects/:id", (req, res) => {

  let id = req.params.id;

  let cambiarEstado = {
    estado: false
  };

  ProyectoSchema.findByIdAndUpdate(id, cambiarEstado, {new: true}, (error, usuarioBorrado) => {
    if(error){
        return res.status(400).json({
            ok: false,
            error
        })
    }
    
    //si se envia el id pero no lo encuentra
    if(!usuarioBorrado){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario no encontrado'
            }
        })
    }

    res.json({
        ok: true,
        usuario: usuarioBorrado
    })
  });
});

module.exports = app;
