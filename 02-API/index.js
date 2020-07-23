const express = require('express');
const app = express();

// const port = 8000;
// app.get('/', (request, response)=>{
//     response.send('Hola Mundo')
// })
// app.get('/todos', (request, response)=>{
//     response.send([{
//         'nombre':  'Dany',
//         'apellido': 'Salame',
//         'edad': 30
//     },
//     {
//         'nombre':  'Dessy',
//         'apellido': 'Hemsani',
//         'edad': 28
//     }])
// })
// app.listen(port, ()=> console.log(`Esta vivo en el puerto ${port}`))

app.get('/', (request, response)=>{
    response.send('Hola Mundo')
})
app.get('/rick', (request, response)=>{
    response.send({
        'character':  'Rick Sanchez'
    })
})
app.get('/saludar/:name/:lastname', (request, response)=>{
    const { name, lastname } = request.params;
    // response.send(`Hola ${name}`)
    if(name === 'dany'){
        response.status(200).json({'respuesta': `Hola ${name} ${lastname} tu si`})
    }else{
        response.status(400).json(`Hubo un error en esta URL`)
    }
})

app.get('/mayores/', (request, response)=>{
    const { edad } = request.query
    if (edad >= 18){
        response.send ('Bienvenido')
    }else{
        response.send('Eres menor de edad')
    }
})

app.listen(7000, ()=> console.log(`Esta vivo en el puerto 7000`))
