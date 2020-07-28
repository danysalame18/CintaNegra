require('./utils/db')
const express = require ('express')
const { config } = require ('./config')
const app = express()

app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: true}));

app.use(require('./routes/PeliculasRoutes'))

app.listen(config.port, ()=> {
    console.log(`Corriendo en puerto ${config.port}`)
})