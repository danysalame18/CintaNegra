const express = require('express');
const router = express.Router();

const Mascotas = require('../models/Mascotas');
const Duenos = require('../models/Duenos')


router.get('/mascotas', (request, response)=>{
    Mascotas.find((err, mascota)=>{
        Duenos.populate(mascota, { path: 'dueno' }, (err, mascota)=>{
            response.status(200).send(mascota)
        })
    })
});

router.get('/mascotas/:id', (request, response)=>{
    const { id } = request.params;
    Mascotas.findById(id, (err, dueno)=>{
        Duenos.populate(dueno, { path: 'dueno' }, (err, dueno)=>{
            if(err)response.status(400).json(err)
            else response.status(200).json(dueno)
            // response.status(200).send(dueno)
        })
    })
});

router.post('/mascotas', (request, response)=>{
    const { body } = request;
    const newMascota = new Mascotas(body)
    newMascota.save()
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});

router.patch('/mascotas/:id', (request, response)=>{
    const { body } = request;
    Mascotas.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

router.delete('/mascotas/:id', (request, response)=>{
    Mascotas.findByIdAndDelete(request.params.id)
        .then((respDB)=> response.status(204).json(respDB))
        .catch((err)=> response.status(400).json(err))
});

module.exports = router;