/* =====================================*/
/* Servicio api rest */
/* =====================================*/
const express = require("express");
const app = express();
const _ = require('underscore');
const ProyectoSchema = require("../models/projects");

// get = obntengo todos los proyectos
app.get("/projects", (req, res) => {
  //obtengo todos los registros guardados, si su estado es verdadero
  ProyectoSchema.find({"estado": true}, 'nombreProject imgMain').exec((err, userWeb) => {
    if(err){
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.json({
        ok: true,
        userWeb
    })
})
});

// get = obntengo un proyecto por id
app.get("/project", (req, res) => {

  //obtengo un proyecto por su id
  let id = req.query.id;

  ProyectoSchema.find({"_id": id, "estado": true}, 'nombreProject descProject technologies icons dateDevelopment imgComplete').exec((err, userWeb) => {
    if(err){
      return res.status(400).json({
          ok: false,
          message: 'Se necesita enviar el id del proyecto',
          id,
          err
      });
    }

    res.json({
        ok: true,
        userWeb
    })
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
    imgComplete: body.imgComp
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
    'estado'
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