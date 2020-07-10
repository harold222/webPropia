const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN', 'USER'],
    message: 'El rol {VALUE} no es valido'
};

// creando esquema del proyecto
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        unique: true,//valor unico en la coleccion
        required: [true, 'El email es requerido']
    },
    password: { 
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: { 
        type: String,
        required: false
    },
    role: { 
        type: String,
        default: 'USER', //valido que solo se envien las dos palabras de arriba
        enum: rolesValidos
    },
    estado: { 
        type: Boolean,
        default: true
    },
    google: { 
        type: Boolean,
        default: false
    }
    
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();

    delete userObject.password; //no envio la contraseña en la respuesta
    return userObject;
}

//mensaje personalizado para el email
userSchema.plugin(uniqueValidator, {
    message: 'El {PATH} debe de ser unico.' 
});

module.exports = mongoose.model("usuario", userSchema); 