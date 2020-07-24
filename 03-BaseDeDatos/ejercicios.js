const express = require('express');
const mongoose = require('mongoose');

const { config2 } =require('./config');
const { request, response } = require('express');

const app = express();
mongoose.connect(
    config2.db.url2,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado'))
    .catch((error)=> console.log('Hubo un error', error))

/*1) Crear una base de datos para un supermercado que pueda 
almacenar lo siguiente:
- Artículo
-Nombre (string)
-Precio (number)
-Existencias (number)
- Ticket
-subtotal (number)
-IVA (number)
-total (number)
-articulos (articulo)*/
const articulosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    existencia: Number,
});

const ticketsSchema = new mongoose.Schema({
    subtotal: Number,
    iva: Number,
    total: Number,
    articulos:[{ type: mongoose.Schema.Types.ObjectId,
        ref: 'articulos' }]
});


/*2) Crear una API que permita realizar las operaciones      
elementales CRUD sobre artículos y ticket.*/
const Articulos = mongoose.model('Articulos', articulosSchema);
const Tickets = mongoose.model('Tickets', ticketsSchema);

app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: true}));

app.get('/', (request, response) => {
    response.send('Trabajando Ejercicios')
});

app.get('/articulos', (request, response)=>{
    Articulos.find()
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});
app.get('/articulos/:id', (request, response)=>{
    Articulos.findById(request.params.id)
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.post('/articulos', (request, response)=>{
    const { body } = request;
    const newArticulo = new Articulos(body)
    newArticulo.save()
        .then((resDB)=> response.status(201).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.patch('/articulos/:id', (request, response)=>{
    Articulos.findByIdAndUpdate(request.params.id, request.body)
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.delete('/articulos/:id', (request, response)=>{
    Articulos.findByIdAndDelete(request.params.id)
        .then((resDB)=> response.status(204).json(resDB))
        .catch((err)=> response.status(400).json(err))
});


// TICKETS
app.get('/tickets', (request, response)=>{
    Tickets.find()
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.get('/tickets/:id', (require, response)=>{
    const { id } = require.params;
    Tickets.findById(id, (err, ticket)=>{
        Articulos.populate(ticket, {path: 'articulos'}, (error, ticket)=>{
            response.status(200).send(ticket)
        })
    })
});

app.post('/tickets', (request, response)=>{
    const { body } = request;
    const newTicket = new Tickets(body)
    newTicket.save()
        .then((resDB)=> response.status(201).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.patch('/tickets/:id', (request, response)=>{
    Tickets.findByIdAndUpdate(request.params.id, request.body)
        .then((resDB)=> response.status(200).json(resDB))
        .catch((err)=> response.status(400).json(err))
});

app.delete('/tickets/:id', (request, response)=>{
    Tickets.findByIdAndDelete(request.params.id)
        .then((resDB)=> response.status(204).json(resDB))
        .catch((err)=> response.status(400).json(err))
});


/*3) Mediante un ENDPOINT calcular el subtotal, IVA y total de
algún ticket.*/

app.listen(config2.port, () => console.log(`Server listening in port: ${config2.port}`));
