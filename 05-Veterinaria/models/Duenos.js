const mongoose = require('mongoose')

const duenoSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    direccion: {
        type: String,
        default: 'Sin Direccion'
    },
    telefono: Number
})

const Duenos = mongoose.model('Duenos', duenoSchema)

module.exports = Duenos;