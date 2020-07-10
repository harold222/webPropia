/* =====================================*/
/* Servicio api rest del usuario que posteara ingo */
/* =====================================*/
const express = require("express");
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const UsuarioSchema = require("../models/user");

// get = obntengo todos los proyectos
app.get("/user", (req, res) => {
    //ejecuto la bsuqueda cuando tenga el get, paginando registros
        //si viene desde, sino toma desde 0
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite  =req.query.hasta || 5;
    limite = Number(limite);

    UsuarioSchema.find({"estado": true}, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err, userWeb) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //cuento los registros
        UsuarioSchema.count({"estado": true}, (err, conteo) => {
            res.json({
                ok: true,
                userWeb,
                conteo
            })
        });

    })
});

// post= creo nuevos proyectos
app.post("/user", (req, res) => {
    //el body lo trabaja es body-parser, asi obtengo todo lo que venga en el post urlencoded
    let body = req.body;

    //creo un usuario de tipo modelo esquema usario
    let usuario = new UsuarioSchema({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    
    //por defecto
    usuario.save((error, usuarioDB) =>{
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        //usuarioDB.password = null; 

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

// put = actualizo info de el proyecto con id
app.put("/user/:id", (req, res) => {
    //obtengo el id del que viene por url
    let id = req.params.id;

    //los campos que si se permitiran actualizar
    let body = _.pick(req.body, [
            'nombre',
            'email',
            'img',
            'role',
            'estado'
        ]
    );

    //BUSCA POR EL ID Y SI LO ENCUENTRA LO ACTUALIZA
    UsuarioSchema.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (error, usuarioDB) => {

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

// delete = desctivo el proyecto por medio del id
app.delete("/user/:id", (req, res) => {
    let id = req.params.id;

    UsuarioSchema.findByIdAndRemove(id, (error, usuarioBorrado) => {
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
