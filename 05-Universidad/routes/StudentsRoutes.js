const express = require('express');
const router = express.Router();

const Students = require('../models/Students');
const Carrers = require('../models/Carrers')


router.get('/students', (request, response)=>{
    Students.find((err, student)=>{
        Carrers.populate(student, { path: 'carrer' }, (err, student)=>{
            response.status(200).send(student)
        })
    })
});

router.get('/students/:id', (request, response)=>{
    const { id } = request.params;
    Students.findById(id, (err, carrer)=>{
        Carrers.populate(carrer, { path: 'carrer' }, (err, carrer)=>{
            if(err)response.status(400).json(err)
            else response.status(200).json(carrer)
            // response.status(200).send(carrer)
        })
    })
});

router.post('/students', (request, response)=>{
    const { body } = request;
    const newStudent = new Students(body)
    newStudent.save()
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});
router.patch('/students/:id', (request, response)=>{
    const { body } = request;
    Students.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

module.exports = router;