const mongoose = require('mongoose')
require ('dotenv').config()

dbData = {
    dbUser: process.env.DB_USER,
    dbPasword: process.env.DB_PASWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
};

let url = `mongodb+srv://${dbData.dbUser}:${dbData.dbPasword}@${dbData.dbHost}/${dbData.dbName}?retryWrites=true&w=majority`
mongoose
    .connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Connected to DB'))
    .catch((error)=> console.log (error))