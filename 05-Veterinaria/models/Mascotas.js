const mongoose = require('mongoose')

const mascotaSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    dueno: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dueno'
        }
    ]
})

const Mascotas = mongoose.model('Mascotas', mascotaSchema)

module.exports = Mascotas;