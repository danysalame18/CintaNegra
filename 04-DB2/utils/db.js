const mongoose = require('mongoose')
const { config } = require ('../config')

mongoose.connect(
    config.db.url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
})
    .then(()=> console.log('Conected to Database'))
    .catch(()=> console.log('Error in Database connection'))