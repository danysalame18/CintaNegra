const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000

/*1.- Agrega un endpoint '/api/' que responda a 
una petición de tipo GET con un código de estado 200 
y el siguiente json: 
{'mensaje':'hola mundo'}*/
app.get("/", (request, response) => {
  response.status(200).json("Hola Mundo");
});

/*2.- Agrega un endpoint '/api/suma' que responda a una 
petición de tipo GET con la suma de dos números que 
reciba mediante las querys num1 y num2. El servidor
debe responder con un código de estado 200 y un json 
como el siguiente:
{'resultado': 7}*/
app.get("/suma/", (request, response) => {
  const { num1, num2 } = request.query;
  const suma = parseInt(num1) + parseInt(num2);
  response.send(`El resultado es ${suma}`);
});

// David Zonana
app.get('/api/suma', (req, res)=>{
    const {numero1, numero2}= req.query;
    const resultado = parseInt(numero1) + parseInt(numero2)
    res.status(200).json({
        'resultado': resultado
    })
})

/*3.- Agrega un endpoint '/api/usuario/' que responda a
una petición de tipo GET con el nombre que sea 
recibido a través de params. El servidor debe responder
con un código de estado 200 y un json como este:
{'usuario': 'Edwin'}*/
app.get("/usuario/:user", (request, response) => {
  const { user } = request.params;
  response.status(200).json({ usuario: `${user}` });
});

/*4.- Agrega un endpoint '/api/swapi' que responda a una
petición de tipo GET con el personaje solicitado de 
https://swapi.co/
El cliente debe mandar el número de personaje mediante
params. La respuesta del servidor debe lucir algo así
{'personaje': {
'name': 'Luke Skywalker',
...,
}}*/
app.get("/swapi/:id", (request, response) => {
  const { id } = request.params;
  const URL = `https://swapi.dev/api/people/${id}`;
  axios.get(URL)
    .then((res) => {
      const {name, height, eye_color, gender, mass} = res.data
      response.status(200).json({
          personaje:{ 
             'name': name,  
             'height': height, 
             'eye_color': eye_color,  
             'gender': gender,  
             'mass': mass 
            }
        });
    })
    .catch((error) => {
      response.status(500).json({
          'error': 'No encontrado'
      })
    });
});

app.listen(port, () => console.log(`Server listening in port: ${port}`));
