const request = require('request');
const axios = require('axios')
// VARIABLES
var juanita = 'Juanita' // ALCANCE GLOBAL
let indice = 0          // ALCANCE LOCAL
const pi = 3.1416       // ALCANCE LOCAL, no se puede sobreescribir

// FUNCIONES
// CONVENCIONAL / VANILLA
function miFuncion(){
    console.log ('soy una funcion')
}
// ARROW FUNCTION, ES6 / ES2015
const otraFuncion = ()=>{
    console.log('soy una arrow function')
}
// FUNCION ANONIMA
const funcionAnonima = function(){
    console.log('soy una funcion anonima')
}

// LLAMADAS A UNA API
const getBreakingBadQuote = ()=>{
    const URL = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes'
    request.get(URL, (error, res, body)=>{
        if(res.statusCode === 200){
            const json = JSON.parse(body)
            console.log(json)
            console.log(json[0].quote)
            console.log(`${json[0].author} dijo ${json[0].quote}`)
        } else console.log(err)
    })
}
// getBreakingBadQuote()

const getBreakingBadQuoteAxios = ()=>{
    const URL = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes'
    axios.get (URL)
        .then((res)=>{
            console.log(res.data[0])
        })
        .catch ((err)=>{
            console.log(err)
        })
}

// getBreakingBadQuoteAxios()

// Ejercicio: consume 3 apis usando request/axios con node js, 
// una api debe ser sin auth, otra api con apikey. 
// Puedes elegir cualquiera de las opciones disponibles 
// en la lista de apis publicas

const getSwApi = ()=>{
    const URL = 'https://swapi.dev/api/people/1'
    axios.get (URL)
        .then((response)=>{
            console.log(response.data.name)
        })
        .catch ((err)=>{
            console.log(err)
        })
}

// getSwApi()

const getGiphy = ()=>{
    const URL = `http://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=footbal&limit=2`
    const KEY = 'aUBNWyA8ruTMmCgwK489Obt3s0DoKVXm'
    axios.get (URL)
        .then((response)=>{
            console.log(response.data)
        })
        .catch ((err)=>{
            console.log(err)
        })
}

// getGiphy()

const getDisney = ()=>{
    const URL = 'https://disneyparksapi.firebaseio.com/orlando/parks/0.json'
    axios.get (URL)
        .then((response)=>{
            console.log(response.data.holiday[0].characters[16])
        })
        .catch ((err)=>{
            console.log(err)
        })
}

getDisney()