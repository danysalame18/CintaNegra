require('dotenv').config();
dbData = {
    dbUser: process.env.DB_USER,
    dbPasword: process.env.DB_PASWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbName2: process.env.DB_NAME2,
};

const config= {
    port : process.env.port,
    db:{
        url: `mongodb+srv://${dbData.dbUser}:${dbData.dbPasword}@${dbData.dbHost}/${dbData.dbName}?retryWrites=true&w=majority`
    }
}

const config2= {
    port : process.env.port,
    db:{
        url2: `mongodb+srv://${dbData.dbUser}:${dbData.dbPasword}@${dbData.dbHost}/${dbData.dbName2}?retryWrites=true&w=majority`
    }
}

// module.exports = {config}
module.exports = {config2}