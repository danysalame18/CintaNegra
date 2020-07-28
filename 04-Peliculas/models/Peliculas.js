const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
    nombre: String,
    genero: String,
    actores: [String],
    descripcion: String
});
const Peliculas = mongoose.model('Peliculas', peliculaSchema)
module.exports = Peliculas;