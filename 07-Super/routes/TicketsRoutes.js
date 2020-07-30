const express = require('express');
const router = express.Router();

const Tickets = require('../models/Tickets');
const Products = require('../models/Products');
// const { request, response } = require('express');


router.get('/tickets', (request, response)=>{
    Tickets.findById()
        .populate('products')
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});

router.get('/tickets/:id', (request, response)=>{
    const { id } = request.params;
    Tickets.findById(id)
        .populate('products')
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});

router.post('/tickets', (request, response)=>{
    const { body } = request;
    const newTicket = new Tickets(body)
    newTicket.save()
        .then((respDB)=> response.status(200).json({ statusInfo:'Succes', respDB }))
        .catch((error)=> response.status(400).json(error))
});

router.patch('/tickets/:id', (request, response)=>{
    const { body } = request;
    Tickets.findByIdAndUpdate(request.params.id, body, {new: true})
        .then((respDB)=> response.status(201).json(respDB))
        .catch((error)=> response.status(400).json(error))
});

// Suma Ticket
router.patch('/tickets/:id/checkout', (request, response)=>{
    const { id } = request.params;
    Tickets.findById(id)
        .populate('products')
        .then((ticket)=>{
            let prices = ticket.products.map((product)=>product.price);
            let subtotal = prices.reduce((total, price)=> total + price);
            const taxes = subtotal * .16 ;
            const total = subtotal + taxes ;
            Tickets.findByIdAndUpdate(id, {subtotal, taxes, total}, {new: true})
                .populate('products')
                .then((ticketSumed)=> response.status(200).json(ticketSumed))
                .catch((error)=> response.status(400).json(error))
            
                // Products.findById(id)
                //     .then((product)=>{
                //         let stock = product.stock.map((stk)=>stk.stocks);
                //         let queda = stock - 1;
                //     })
                // Products.findById(id, {stock}, {new: true})
                //     .then((stockRest)=> response.status(200).json(stockRest))
                //     .catch((error)=> response.status(400).json(error))
         
        })
})

// Acaba suma

router.delete('/tickets/:id', (request, response)=>{
    Tickets.findByIdAndDelete(request.params.id)
        .then((respDB)=> response.status(204).json(respDB))
        .catch((err)=> response.status(400).json(err))
});

module.exports = router;