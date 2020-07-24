const express = require('express');
const mongoose = require('mongoose');

const { config } =require('./config');
const { request, response } = require('express');

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
});
// MODELO => OBJETO QUE ME DEJA INTERACTUAR CON LA COLECCION DE MONGO DB
const Equipos = mongoose.model('Equipos', equiposSchema);
app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: true}));

app.get('/', (request, response) => {
    response.send('Trabajando')
})

app.get('/equipos', (request, response)=>{
    Equipos.find()
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});
app.get('/equipos/:id', (request, response)=>{
    Equipos.findById(request.params.id)
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.post('/equipos', (request, response)=>{
    // RECIBIR INFO QUE MANDA EL CLIENTE
    const { body } = request;
    // PEDIRLE A LA BASE DE DATOS QUE CREE UN DOCUMENTO CON LA INFO DEL BODY
    const newEquipo = new Equipos(body)
    newEquipo.save()
        .then((resDB)=> response.status(201).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.patch('/equipos/:id', (request, response)=>{
    Equipos.findByIdAndUpdate(request.params.id, request.body)
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.delete('/equipos/:id', (request, response)=>{
    Equipos.findByIdAndDelete(request.params.id)
        .then((resDB)=> response.status(204).json(resDB))
        .catch((err)=> response.status(400).json(err))
});



app.listen(config.port, () => console.log(`Server listening in port: ${config.port}`));
