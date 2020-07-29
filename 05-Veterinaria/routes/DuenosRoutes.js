const express = require('express');
const router = express.Router();

const Duenos = require('../models/Duenos');
const { response, request } = require('express');

router.post('/duenos', (request, response)=>{
    const { body } = request;
    const newDueno = new Duenos(body)
    newDueno.save()
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});

router.get('/duenos', (request, response)=>{
    Duenos.find()
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

router.patch('/dueno/:id', (request, response)=>{
    const { body } = request;
    Duenos.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

router.delete('/duenos/:id', (request, response)=>{
    Duenos.findByIdAndDelete(request.params.id)
        .then((respDB)=> response.status(204).json(respDB))
        .catch((err)=> response.status(400).json(err))
});

module.exports = router;