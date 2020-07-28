const mongoose = require('mongoose')
const { config } = require ('../config')

mongoose.connect(
    config.db.url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
})
    .then(()=> console.log('Conectado a la base de datos'))
    .catch(()=> console.log('Error in Database connection'))