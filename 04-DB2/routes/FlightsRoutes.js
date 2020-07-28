const express = require('express')
const router = express.Router();

const Flights = require('../models/Flights');
const { request, response } = require('express');

router.get('/flights', (request, response)=>{
    Flights.find()
        .then((responseDB)=> response.status(200).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});

router.get('/flights/:id', (request, response)=>{
    Flights.findById(request.params.id)
        .then((responseDB)=> response.status(200).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});


router.post('/flights', (request, response)=>{
    const { body } = request;
    const newFlight = new Flights(body)
    newFlight.save()
        .then((responseDB)=> response.status(201).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});


router.patch('/flights/:id', (request, response)=>{
    const { body } = request;
    Flights.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((responseDB)=> response.status(201).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});


router.delete('/flights/:id', (request, response)=>{
    Flights.findByIdAndDelete(request.params.id)
        .then((responseDB)=> response.status(204).json(responseDB))
        .catch((error)=> response.status(400).json(error))
});

module.exports = router;