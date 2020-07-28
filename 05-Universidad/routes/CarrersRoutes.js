const express = require('express');
const router = express.Router();

const Carrers = require('../models/Carrers');
const { response, request } = require('express');

router.post('/carrers', (request, response)=>{
    const { body } = request;
    const newCarrer = new Carrers(body)
    newCarrer.save()
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});
router.get('/carrers', (request, response)=>{
    Carrers.find()
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});
router.patch('/carrers/:id', (request, response)=>{
    const { body } = request;
    Carrers.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

module.exports = router;