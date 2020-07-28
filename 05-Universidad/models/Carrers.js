const mongoose = require('mongoose')

const carrerSchema = new mongoose.Schema({
    nombre: String,
    matricula: String,
    director: {
        type:String,
        default: 'Default'
    },
    facultad: String
})

const Carrers = mongoose.model('Carrers', carrerSchema)

module.exports = Carrers;