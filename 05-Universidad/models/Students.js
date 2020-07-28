const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    empleo: String,
    carrer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carrer'
        }
    ]
})

const Students = mongoose.model('Students', studentSchema)

module.exports = Students;