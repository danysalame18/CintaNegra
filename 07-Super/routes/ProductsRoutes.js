const express = require('express');
const router = express.Router();

const Products = require('../models/Products');
const { response, request } = require('express');

router.post('/products', (request, response)=>{
    const { body } = request;
    const newProduct = new Products(body)
    newProduct.save()
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});

router.get('/products', (request, response)=>{
    Products.find()
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

router.patch('/products/:id', (request, response)=>{
    const { body } = request;
    Products.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

router.delete('/products/:id', (request, response)=>{
    Products.findByIdAndDelete(request.params.id)
        .then((respDB)=> response.status(204).json(respDB))
        .catch((err)=> response.status(400).json(err))
});

module.exports = router;