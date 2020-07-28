require('./config/db')
const express = require ('express')
const app = express()
app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: true}));

// Rutas de carreras
app.use(require('./routes/CarrersRoutes'))
app.use(require('./routes/StudentsRoutes'))

app.listen(8000, console.log(`Listening on port 8000`))