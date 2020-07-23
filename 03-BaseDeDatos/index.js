const express = require('express');
const mongoose = require('mongoose');

const { config } =require('./config')

const app = express();
mongoose.connect(
    config.db.url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado'))
    .catch((error)=> console.log('Hubo un error', error))

// GENERAR ESQUEMA => DEFINE LAS REGLAS DENTRO DE LA COLECCION
const equiposSchema = new mongoose.Schema({
    nombre: String,
    liga: String,
    titulos: Number,
    clasifico: Boolean,
})
// MODELO => OBJETO QUE ME DEJA INTERACTUAR CON LA COLECCION DE MONGO DB
const Equipos = mongoose.model('Equipos', equiposSchema)

app.get('/', (request, response) => {
    response.send('Trabajando')
})

app.get('/equipos', (request, response)=>{
    Equipos.find()
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
})



app.listen(config.port, () => console.log(`Server listening in port: ${config.port}`));
