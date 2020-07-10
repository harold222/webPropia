const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// creando esquema del proyecto
let Schema = mongoose.Schema;

let projectSchema = new Schema({
    nombreProject:{
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido']
    },
    descProject:{
        type: String,
        required: [true, 'La descripcion es requerida']
    },
    technologies:{
        type: String,
        required: [true, 'Las tecnologias son requeridas']
    },
    icons:{
        type: String,
        required: false
    },
    dateDevelopment:{
        type: Date,
        required: false
    },
    imgMain:{
        type: String,
        required: [true, 'La imagen principal es requerida']
    },
    imgComplete:{
        type: String,
        required: [true, 'La imagen completa es requerida']
    },
    estado:{
        type: Boolean,
        default: true
    },
    date: { 
        created: {
            type: Date, 
            default: Date.now
        }
    }
    
});

projectSchema.plugin(uniqueValidator, {
    message: 'El {PATH} debe de ser unico.' 
});

module.exports = mongoose.model("proyecto", projectSchema);