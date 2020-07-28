const express = require('express')
const router = express.Router();

const Peliculas = require('../models/Peliculas');
const { request, response } = require('express');

router.get('/peliculas', (request, response)=>{
    Peliculas.find()
        .then((responseDB)=> response.status(200).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});

router.get('/peliculas/:id', (request, response)=>{
    Peliculas.findById(request.params.id)
        .then((responseDB)=> response.status(200).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});


router.post('/peliculas', (request, response)=>{
    const { body } = request;
    const newPelicula = new Peliculas(body)
    newPelicula.save()
        .then((responseDB)=> response.status(201).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});


router.patch('/peliculas/:id', (request, response)=>{
    const { body } = request;
    Peliculas.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((responseDB)=> response.status(201).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});


router.delete('/peliculas/:id', (request, response)=>{
    Peliculas.findByIdAndDelete(request.params.id)
        .then((responseDB)=> response.status(204).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});

module.exports = router;